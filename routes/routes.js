const express = require('express');
const frontEndchatBot = require('../controllers/frontEndchatBot');
const receiveAIResponseHandler = require('../controllers/receiveAIResponseHandler');

const router = express.Router();

// Endpoint for the Frontend ChatBot
router.post('/produce-message', frontEndchatBot);

// Endpoint to get the last AI response from Kafka
router.get('/ai-response/:userId', receiveAIResponseHandler);

module.exports = router;
