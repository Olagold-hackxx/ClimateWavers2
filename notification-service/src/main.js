// Import the required modules
const { sendNotification } = require('./senders');
const EmailService = require('./emailService');

// Modify the server startup to trigger the email notification
// Assume you have a function 'triggerEmailNotifications' to send emails.
triggerEmailNotifications();

// Function to trigger email notifications
function triggerEmailNotifications() {
  // Fetch the notifications related to climate disasters
  const notifications = fetchNotifications(); // Implement the method to retrieve notifications

  // Process and send email notifications for each item
  notifications.forEach((notification) => {
    const { type, message } = notification;
    sendEmailNotification(type, message);
  });
}

// Function to fetch notifications related to climate disasters
function fetchNotifications() {
  // Simulating notifications related to climate disasters

  // Sample notifications
  return [
    { type: 'Flood', message: 'Flood warning: Heavy rain expected in your area. Take precautions.' },
    { type: 'Earthquake', message: 'Earthquake alert: Mild tremors reported in your region.' },
    // Add more notifications for different disaster types as necessary
  ];
}

// Function to send an email notification
function sendEmailNotification(type, message) {
  const recipientEmail = 'example@example.com'; // Replace with the recipient's email

  const emailContent = {
    subject: `Notification: ${type}`,
    body: message,
    // Add any additional email parameters or configuration here
  };

  // Assuming the EmailService provides a method to send emails
  EmailService.sendEmail(recipientEmail, emailContent);
}

// Export the email notification trigger function (if needed)
module.exports = { triggerEmailNotifications };
