require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI();

async function generateOpenAIResponse(userLocation, message) {
  try {
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: message,
      max_tokens: 50,
      temperature: 0.7,
    });

    // Extract and return the AI's response from the completion
    return completion.choices[0].text;
  } catch (error) {
    // Handle any errors, e.g., network issues or API errors
    console.error('Error in generateOpenAIResponse:', error);
    throw error;
  }
}

module.exports = generateOpenAIResponse;

