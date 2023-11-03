// src/senders.js 

const EmailService = require('./emailService'); 

function sendEmailNotification(type, message) {
  const emailContent = {
    subject: `ClimateWaver Alert: ${type}`, // Modify subject as needed
    body: message // The body of the email
  };

  // Assuming you have the recipient's email address
  const recipientEmail = 'user@example.com'; // Replace with the actual recipient's email address

  // Send email notification
  EmailService.sendEmail(recipientEmail, emailContent);
}

module.exports = { sendEmailNotification };
