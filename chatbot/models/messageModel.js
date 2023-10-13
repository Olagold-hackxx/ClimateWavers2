const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: String,
  message: String,
  response: String,
  location: {
    type: { type: String },
    coordinates: [Number, Number],
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
