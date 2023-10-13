const express = require('express');
const router = express.Router();
const chatBotController = require('../controllers/chatBotController');

// Define the chatbot route for a specific user ID
router.post('/:userId/chatbot', chatBotController.chatBot);

module.exports = router;
