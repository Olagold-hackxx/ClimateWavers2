// controllers/ChatGPTController.js
const { ChatGPT } = require('./ChatGPT'); // Replace with the actual path to your ChatGPT module

// Function to generate email content using ChatGPT
async function generateEmailContent(message) {
    try {
        // Assuming ChatGPT provides a function for text generation
        const generatedText = await ChatGPT.generateText(message);
        return generatedText;
    } catch (error) {
        console.error('Error generating email content:', error);
        throw error;
    }
}

module.exports = { generateEmailContent };
