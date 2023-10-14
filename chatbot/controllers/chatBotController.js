const Message = require('../models/chatbotModel');
const { getAllUsers } = require('../utility/userDetails');
require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI();
const { WebSocket } = require('../websocket'); // Import the WebSocket module

async function chatBot(req, res) {
  try {
    const { message, userLocation } = req.body;
    const userId = req.params.userId;
    const allUsers = getAllUsers();

    // Retrieve user based on userId
    let user = allUsers.find(userObject => {
      const values = Object.values(userObject);
      return values.includes(userId);
    });

    if (user) {
      const aiResponse = await generateOpenAIResponse(userLocation, message);

      // Create a new message with the user's message and AI response
      const newMessage = new Message({
        userId,
        message,
        response: aiResponse,
        location: {
          type: 'Point',
          coordinates: [userLocation.latitude, userLocation.longitude],
        },
      });

      // Log the new message for debugging
      console.log('New message:', newMessage);

      // Save the new message
      await newMessage.save();

      // Use WebSocket to send the new message to the user in real-time
      WebSocket.sendToUser(userId, newMessage);

      res.status(201).json(newMessage);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function generateOpenAIResponse(userLocation, message) {
  try {
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: message, // Use the user's message as the prompt
      max_tokens: 50, // Adjust the token limit as needed
      temperature: 0.7, // Adjust temperature for response randomness
    });

    // Extract and return the AI's response from the completion
    return completion.choices[0].text;
  } catch (error) {
    // Handle any errors, e.g., network issues or API errors
    console.error('Error in generateOpenAIResponse:', error);
    throw error;
  }
}

module.exports = {
  chatBot,
};

