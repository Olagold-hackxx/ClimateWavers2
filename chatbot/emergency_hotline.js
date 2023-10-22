const openai = require('openai');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Set  OpenAI GPT-3 API key from the environment variable
const apiKey = process.env.OPENAI_API_KEY;

const openaiClient = new openai({ key: apiKey });

async function automateEmergencyHotline(message) {
  try {
    const response = await openaiClient.completions.create({
      engine: 'davinci',
      prompt: message,
      max_tokens: 100,
    });
    return response.choices[0].text.trim();
  } catch (error) {
    console.error('Error automating emergency hotline:', error);
    return null;
  }
}

module.exports = { automateEmergencyHotline };
