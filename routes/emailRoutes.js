// routes/emailRoutes.js
const express = require('express');
const { sendEmailController } = require('../controllers/emailController');

const router = express.Router();

// Route to send an email
router.post('/send-email', sendEmailController);

module.exports = router;
