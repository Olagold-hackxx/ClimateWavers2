// Import necessary modules and libraries
const Message = require('../models/chatbotModel'); 
const Conversation = require('../models/conversationModel');
const { getAllUsers } = require('../utility/userDetails');
const logger = require('../logger');
const User = require('../models/userModel');
const axios = require('axios');
const OpenAI = require('openai');
const openai = new OpenAI(); 
const kafka = require('kafka-node');
const EventEmitter = require('events'); 
const { sequelize } = require('../db/mariaDb');
require('dotenv').config();

// Set up Kafka Producer and handle its events
const kafkaClient = new kafka.KafkaClient({
  kafkaHost: 'zkless-kafka-bootstrap:9092' 
});

const kafkaProducer = new kafka.Producer(kafkaClient);

kafkaProducer.on('ready', () => {
  console.log('Kafka Producer is ready');
});

kafkaProducer.on('error', (error) => {
  console.error('Error in Kafka Producer:', error);
});

// Array to store received messages from Kafka
const receivedMessages = [];

// Configuration for Kafka Consumer
const consumerOptions = {
  kafkaHost: 'zkless-kafka-bootstrap:9092', 
  groupId: 'group_1',
  autoCommit: true,
  autoCommitIntervalMs: 5000,
};

const consumer = new kafka.ConsumerGroup(consumerOptions, ['user_messages']);

console.log('Kafka consumer is listening for messages...');

// Event listener for incoming messages from Kafka
consumer.on('message', function (message) {
  console.log('Received message');
  receivedMessages.push(JSON.parse(message.value)); // Store the received message in memory
  messageEmitter.emit('newMessage', receivedMessages[receivedMessages.length - 1]);
});

// Event listener for Kafka consumer errors
consumer.on('error', function (err) {
  console.error('Error:', err);
});

// Event listener for Kafka consumer's offset out of range error
consumer.on('offsetOutOfRange', function (err) {
  console.error('Offset out of range:', err);
});

// Handle interrupt signal and close consumer
process.on('SIGINT', function () {
  consumer.close(true, function () {
    process.exit();
  });
});

// Map to store cancellation tokens for each user
const cancelTokens = new Map();

// Event emitter for handling new messages
const messageEmitter = new EventEmitter();

// Event listener for newMessage event
messageEmitter.on('newMessage', (latestReceivedMessage) => {
  chatBot(latestReceivedMessage); // Invoke the chatBot function for the new message
});

// Function to process incoming messages and generate responses
async function chatBot(latestReceivedMessage) {
  try {
    const { userId, message, userLocation } = latestReceivedMessage;

    // Validate incoming message
    if (!userId || !message || typeof message !== 'string' || !userLocation) {
      logger.error('Invalid message from Kafka');
      return;
    }

    // Check if the message is a greeting
    if (isGreeting(message)) {
      const welcomeMessage = "Hello, I am WeaverX, feel free to ask me any questions related to climate and disaster, Let's protect our planet!";
      const newMessage = new Message({
        userId,
        message,
        response: welcomeMessage,
        location: {
          type: 'Point',
          coordinates: [userLocation.latitude, userLocation.longitude],
        },
      });

      await newMessage.save(); // Save the welcome message
      return;
    }
    
    const user = await User.findByPk(userId); // Find the user by ID using Sequelize

    if (!user) {
      logger.error('User not found');
      return;
    }

    // User exists in the database
    logger.info('User found in the database');
    // Initialize variables
    let aiResponse;
    let conversation = await Conversation.findOne({ userId });

    // Create new conversation if not found
    if (!conversation) {
      conversation = new Conversation({
        userId,
        conversation: [], // Initialize conversation as an empty array
      });
    }

    const conversationHistory = conversation.conversation;
    const newMessageEntry = {
      sender: 'user',
      message,
    };

    // Cancel previous request if exists
    if (cancelTokens.has(userId)) {
      cancelTokens.get(userId)(); // Cancel the previous request
    }

    // Generate AI response using OpenAI
    aiResponse = await generateOpenAIResponse(message, conversationHistory, userId, userLocation, cancelTokens);
    sendResponseToKafka('ai_responses', { userId, aiResponse }); // Send AI response to Kafka

    // Update conversation history
    conversationHistory.push(newMessageEntry);
    conversation.conversation = conversationHistory;
    await conversation.save(); // Save updated conversation

    // Save the AI response as a new message
    const newMessage = new Message({
      userId,
      message,
      response: aiResponse,
      location: {
        type: 'Point',
        coordinates: [userLocation.latitude, userLocation.longitude],
      },
    });

    await newMessage.save(); // Save the AI response message
  } catch (error) {
    logger.error(error); // Log any errors
  }
}

// Function to generate AI response using OpenAI
async function generateOpenAIResponse(message, conversationHistory, userId, userLocation, cancelTokens) {
  const prompt = `${message}\n${conversationHistory.map(entry => entry.message).join('\n')}`;

  return new Promise(async (resolve, reject) => {
    const source = axios.CancelToken.source();
    cancelTokens.set(userId, source.cancel);

    try {
      const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 1000,
        temperature: 0.7
      });

      resolve(completion.choices[0].text); // Resolve with AI response
    } catch (error) {
      if (axios.isCancel(error)) {
        reject('Request canceled'); // Reject with cancellation message
      } else {
        reject(error); // Reject with the encountered error
      }
    } finally {
      cancelTokens.delete(userId);
    }
  });
}

// Function to check if the message is a greeting
function isGreeting(message) {
  const greetings = ["hello", "hi", "hey", "greetings", "howdy", "yo"];
  const lowerCaseMessage = message.toLowerCase();
  return greetings.some(greeting => lowerCaseMessage.includes(greeting));
}

// Function to send AI response to Kafka
function sendResponseToKafka(topic, payload) {
  const aiResponsePayload = [
    {
      topic,
      messages: JSON.stringify(payload)
    }
  ];

  kafkaProducer.send(aiResponsePayload, (error, data) => {
    if (error) {
      console.error('Error publishing AI response to Kafka:', error); // Log Kafka publishing errors
    } else {
      console.log('AI response successfully published to Kafka:', data); // Log successful AI response publishing
    }
  });
}
