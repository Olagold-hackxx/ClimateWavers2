const mongoose = require('mongoose');

// Define a schema for the conversation
const conversationSchema = new mongoose.Schema({
  userId: {
    type: String, // You might use a different data type based on your user IDs
    required: true,
  },
  conversation: [
    {
      sender: {
        type: String,
        required: true,
        unique: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
});

// Create a model using the schema
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
