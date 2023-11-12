// senders.js 
const { sendNotificationEmail } = require('./EmailNotificationController');

// Function to send an email notification
function sendEmailNotification(type, message, recipientEmail) {
  const emailContent = {
    subject: `ClimateWaver Alert: ${type}`,
    body: message
  };

  // Assuming you have the recipient's email address
  // Send email notification using the consolidated function
  sendNotificationEmail(recipientEmail, emailContent);
}

module.exports = { sendEmailNotification };
