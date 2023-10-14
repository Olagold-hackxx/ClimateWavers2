const Message = require('../models/chatbotModel');
const { getAllUsers } = require('../utility/userDetails');
require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI();

async function chatBot(req, res) {
  try {
    const { message, userLocation } = req.body; // Include userLocation in the request body
    const userId = req.params.userId;
    // Retrieve all users
    const allUsers = getAllUsers();

    // Log the received userId and userLocation for debugging
    console.log(`Received userId: ${userId}`);
    console.log(`Received userLocation:`, userLocation);

    // Find the user based on userId without using `find`
    let user = null;

    for (let i = 0; i < allUsers.length; i++) {
      const userObject = allUsers[i];
      const keys = Object.keys(userObject);
      const values = Object.values(userObject);

      for (let j = 0; j < keys.length; j++) {
        if (values[j] == userId) {
          user = userObject;
          break; // Found a match, no need to continue the inner loop
        }
      }

      if (user) {
        break; // Found a match, no need to continue the outer loop
      }
    }

    // Log the found user for debugging
    console.log('Found user:', user);

    if (user) {
      // Get the user's last known location from the user object
      let userLastLocation = null;

const keys = Object.keys(user);
const values = Object.values(user);

for (let i = 0; i < keys.length; i++) {
  if (typeof values[i] === 'object') {
    // Check if the property value is an object
    userLastLocation = values[i];
    break; // Stop the loop once you find the location object
  }
}

console.log('User last location:', userLastLocation);


      // Generate AI response using OpenAI
      const aiResponse = await generateOpenAIResponse(userLastLocation, message);

      // Create a new message with the user's message and AI response
      const newMessage = new Message({
        userId,
        message,
        response: aiResponse,
        location: {
          type: 'Point',
          coordinates: [userLocation.latitude, userLocation.longitude],
        },      });

      // Log the new message for debugging
      console.log('New message:', newMessage);

      await newMessage.save();
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
