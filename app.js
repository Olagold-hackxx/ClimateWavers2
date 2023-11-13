const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (r
// Connection string for MongoDB Atlas
const atlasConnectionString = 'mongodb+srv://climate:climate@cluster0.nel0lco.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
(async () => {
  try {
    await mongoose.connect(atlasConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB Atlas'); 
  } catch (err) {
    console.error('Error connecting to MongoDB:', err); 
  }
})();


// Define a schema for the messages
const messageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// Create a model using the schema
const Message = mongoose.model('Message', messageSchema);

// Controller function to handle the route logic
const getMessagesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Query MongoDB for messages sent by a specific user
    const messages = await Message.find({ userId });

    // Send the data back to the client as JSON
    res.json(messages);
  } catch (error) {
    console.error('Error retrieving messages from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Define the route using the controller function
app.get('/get-messages/:userId', getMessagesByUserId);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
