//const OpenAIApi = require('openai');
//const Configuration = require('openai');
require("dotenv").config();



const OpenAI = require("openai");

const openai = new OpenAI();

async function main() {
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: "What is the Capital of Nigeria?",
    max_tokens: 7,
    temperature: 0,
  });

  console.log(completion);
}
main();