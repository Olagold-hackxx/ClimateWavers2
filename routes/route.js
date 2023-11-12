// routes/emailRoutes.js
const express = require('express');
const { sendEmailController } = require('../controllers/EmailNotificationController.js');

const router = express.Router();

// Route to send an email
router.post('/send-email', sendEmailController);

module.exports = router;
