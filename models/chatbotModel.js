const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: String,
  message: String,
  response: String,
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
