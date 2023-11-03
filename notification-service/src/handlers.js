// src/handlers.js
const EmailService = require('./emailService'); // Import the email service

function handleConnection(socket) {
  console.log('Client connected');

  // Assuming you have a trigger to send email notifications
  triggerEmailNotifications();

  socket.on('close', () => {
    console.log('Client disconnected');
  });
}

// Function to trigger email notifications
function triggerEmailNotifications() {
  // Create and send email notifications
  const notification = new Notification(1, 'Climate Alert', 'Your message here', new Date().toISOString());
  sendEmailNotification(notification);
}

// Function to send an email notification
function sendEmailNotification(notification) {
  const emailContent = {
    subject: notification.type,
    body: notification.message,
    // Add any additional email parameters or configuration here
  };

  // Assuming you have the recipient's email address
  const recipientEmail = 'user@example.com'; // Replace with the actual recipient's email address

  // Send the email using the EmailService
  EmailService.sendEmail(recipientEmail, emailContent);
}

module.exports = { handleConnection };

