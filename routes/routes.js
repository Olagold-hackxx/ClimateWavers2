const express = require('express');
const { frontEndchatBot, receiveAIResponseHandler } = require('../controllers/chatBotController');

const router = express.Router();

// Endpoint for the Frontend ChatBot
router.post('/chat', frontEndchatBot);

// Endpoint to get the last AI response from Kafka
router.get('/ai-response/:userId', receiveAIResponseHandler);

module.exports = router;
