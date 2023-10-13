const Message = require('../models/messageModel');
const { getUserById } = require('../utility/userDetails'); // Import the getUserById function
const { getUserLocation } = require('../utility/userLocation'); // Import the getUserLocation function for Geolocation API

// Controller for creating a new message
async function createMessage(req, res) {
  try {
    const { userId, message } = req.body;

    // Call the function to get user details from the JSON data
    const userDetails = await getUserById(userId);

    if (!userDetails) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Assuming your JSON structure contains location data
    const { last_location } = userDetails;

    if (!last_location) {
      return res.status(400).json({ error: 'User location not available' });
    }

    // Call the function to get user location from the Geolocation API using last_location
    const userLocation = await getUserLocation(last_location); // Adjust based on your user data

    // Create a new message with user details and location
    const newMessage = new Message({
      userId,
      message,
      response: '', // You may update this field based on your chatbot logic
      location: {
        type: 'Point', // Assuming you're using GeoJSON format
        coordinates: [userLocation.longitude, userLocation.latitude], // Assuming your API provides coordinates
      },
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Add other controller functions for retrieving, updating, and deleting messages if needed

module.exports = {
  createMessage,
  // Add other controller functions as needed
};
