// emailService.js

require('dotenv').config(); // Load environment variables from .env file

const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using Gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to send emails
function sendEmail(recipient, emailContent) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: emailContent.subject,
    text: emailContent.body
  };

  // Send the email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Email sending error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Export the function to send emails
module.exports = { sendEmail };
