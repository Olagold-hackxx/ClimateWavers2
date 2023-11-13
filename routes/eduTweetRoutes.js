const express = require('express');
const router = express.Router();
const chatBotController = require('../controllers/tweetController');

router.post('/generate-educational-tweet', async (req, res) => {
  try {
    await chatBotController.generateEducationalTweet(req, res);
  } catch (error) {
    // Handle any potential errors
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/educational-tweet', async (req, res) => {
  try {
    await chatBotController.getAllEducationalTweets(req, res);
  } catch (error) {
    // Handle any potential errors
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
