// notification-service/src/handlers.js
const EmailService = require('./emailService');
const { Notification } = require('./models'); // Import Notification model

// Remove or comment out the handleConnection function
// function handleConnection(socket) {
//   console.log('Client connected');
  
//   // Assuming you have a trigger to send email notifications
//   triggerEmailNotifications();

//   socket.on('close', () => {
//     console.log('Client disconnected');
//   });
// }

// Function to trigger email notifications
function triggerEmailNotifications() {
  // Fetch and process notifications for email dispatch
  const notifications = fetchNotifications(); // Implement the method to retrieve notifications
  
  notifications.forEach((notification) => {
    sendEmailNotification(notification); // Send email for each notification
  });
}

// Function to send an email notification
function sendEmailNotification(notification) {
  const emailContent = {
    subject: notification.type,
    body: notification.message,
    // Add any additional email parameters or configuration here
  };

  const recipientEmail = getUserEmail(notification.userId); // Implement method to fetch user's email

  EmailService.sendEmail(recipientEmail, emailContent); // Send the email
}

// Function to fetch notifications
function fetchNotifications() {
  // Implement logic to fetch actual notifications from the system
  // Return a list of notifications
  return [
    new Notification(1, 'Notification Type', 'Notification Message', new Date().toISOString(), 'userID_1'),
    // Add more notifications if needed
  ];
}

// Function to fetch user email based on user ID
function getUserEmail(userId) {
  // Implement logic to fetch user-specific email from  database 
  const usersEmails = {
    userID_1: 'user1@example.com',
    // Add more user-email pairs if needed
  };

  return usersEmails[userId];
}

module.exports = { triggerEmailNotifications };
