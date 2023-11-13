const express = require('express');
const router = express.Router();
const chatBotController = require('../controllers/chatBotController');

router.post('/chatbot', async (req, res) => {
  try {
    await chatBotController.chatBot(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
