const openai = require('openai');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Set  OpenAI GPT-3 API key from the environment variable
const apiKey = process.env.OPENAI_API_KEY;

const openaiClient = new openai({ key: apiKey });

async function monitorSocialMediaMentions(posts) {
  const responses = [];

  for (const post of posts) {
    try {
      const response = await openaiClient.completions.create({
        engine: 'davinci',
        prompt: post,
        max_tokens: 150,
      });
      responses.push(response.choices[0].text.trim());
    } catch (error) {
      console.error('Error monitoring social media mentions:', error);
      responses.push(null);
    }
  }

  return responses;
}

module.exports = { monitorSocialMediaMentions };
