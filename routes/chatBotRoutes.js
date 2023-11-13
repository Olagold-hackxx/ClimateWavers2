const express = require('express');
const router = express.Router();
const chatBotController = require('../controllers/chatBotController');

router.post('/:userId/chatbot', async (req, res) => {
  const userId = req.params.userId;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  try {
    await chatBotController.chatBot(req, res);
  } catch (error) {
    // Handle any potential errors
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
