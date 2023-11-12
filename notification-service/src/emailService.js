// notification-service/src/emailService.js
const { sendNotificationEmail } = require('./EmailNotificationController');

// Function to send emails using the consolidated function
async function sendEmail(emailData) {
  const { to, subject, text } = emailData;

  try {
    // Send email using the consolidated function
    await sendNotificationEmail(to, { subject, body: text });
    // You may choose to return some information or handle success in other ways
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    throw error;
  }
}

module.exports = { sendEmail };
