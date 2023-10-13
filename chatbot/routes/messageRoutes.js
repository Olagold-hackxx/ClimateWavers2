const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Create a new message
router.post('/messages', messageController.createMessage);

// Get all messages
router.get('/messages', messageController.getAllMessages);

// Get a specific message by ID
router.get('/messages/:id', messageController.getMessageById);

// Update a specific message by ID
router.put('/messages/:id', messageController.updateMessage);

// Delete a specific message by ID
router.delete('/messages/:id', messageController.deleteMessage);

module.exports = router;
