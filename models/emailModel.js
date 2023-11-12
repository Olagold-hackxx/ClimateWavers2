// models/emailModel.js
require('dotenv').config(); // Load environment variables from .env file
const nodemailer = require('nodemailer');

const sendEmail = async (emailData) => {
    const { to, subject, text } = emailData;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
};

module.exports = { sendEmail };
