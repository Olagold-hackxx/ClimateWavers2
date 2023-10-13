const Message = require('../models/messageModel');
const { getAllUsers } = require('../utility/userDetails');
const generateOpenAIResponse = require('../utility/AIResponse'); // Import the OpenAI response generator

async function chatBot(req, res) {
  try {
    const { message } = req.body;
    const userId = req.params.userId;
    // Retrieve all users
    const allUsers = getAllUsers();

    // Log the received userId for debugging
    console.log(`Received userId: ${userId}`);

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
      const userLocation = user.last_location;

      // Log the user's last location for debugging
      console.log(`User location: ${userLocation}`);

      // Generate AI response using OpenAI
      const aiResponse = await generateOpenAIResponse(userLocation, message);

      // Create a new message with the user's message and AI response
      const newMessage = new Message({
        userId,
        message,
        response: aiResponse,
        location: userLocation,
      });

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

module.exports = {
  chatBot,
};
