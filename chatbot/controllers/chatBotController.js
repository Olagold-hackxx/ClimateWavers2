const Message = require('../models/messageModel');
const { getAllUsers } = require('../utility/userDetails'); // Import getAllUsers

async function chatBot(req, res) {
  try {
    const { message } = req.body;
    const userId = req.params.userId;
    // Retrieve all users
    const allUsers = getAllUsers();

    // Find the user based on userId without using `find`
    const user = allUsers.filter((user) => user.pk === userId); // Get the first matching user

    if (user.length > 0) {
      // Get the user's last known location from the user object
      const userLocation = user.last_location;

      // You can now use the userLocation and implement the chatbot logic
      // Call the OpenAI API or any other logic you need to generate a response

      // Create a new message with the user's message, AI response, and location
      const newMessage = new Message({
        userId,
        message,
        response: 'Your AI response goes here', // Replace with the actual response
        location: userLocation,
      });

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
