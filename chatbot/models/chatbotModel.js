const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: String,
  message: String,
  response: String,
  location: {
    type: {
      type: String,
      default: "Point", // Set the default type to "Point" if not specified
    },
    coordinates: {
      type: [Number], // Define coordinates as an array of numbers
      index: '2dsphere', // Specify an index for 2dsphere coordinates
    },
  },
});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
