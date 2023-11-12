// controllers/EmailNotificationController.js
const { User } = require('../models/User');
const { generateEmailContent } = require('./ChatGPTController'); // Import ChatGPT controller
const nodemailer = require('nodemailer');

// Function to handle incoming messages and user location from an API
async function handleAPIRequest(message, location) {
    try {
        // Fetch users from the database based on last known location
        const users = await User.findAll({
            where: { lastLocation: location },
            attributes: ['email']
        });

        users.forEach(async (user) => {
            // Generate email content using ChatGPT
            const emailContent = await generateEmailContent(message);

            // Send email notification
            sendNotificationEmail(user.email, emailContent);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Function to send email notifications
function sendNotificationEmail(userEmail, message) {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: 'New Notification from ClimateWaver',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Export the functions
module.exports = {
    handleAPIRequest,
    sendNotificationEmail // Exported in case it's needed elsewhere
};
