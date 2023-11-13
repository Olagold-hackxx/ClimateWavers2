const Post = require('../models/eduPostModel');
const User = require('../models/userModel');
const logger = require('../logger');
const axios = require('axios');
const OpenAI = require("openai");
const openai = new OpenAI();
const { v4: uuidv4 } = require('uuid'); 
require("dotenv").config();
async function generateEducationalTweet(req, res) {
  try {
    const previousPosts = await Post.findAll({
      order: [['date_created', 'DESC']],
      limit: 3,
    });

    const context = previousPosts.map(post => post.content_text).join('\n');

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `${context} + Generate a different education tweet about climates or earthquakes or disasters or flooding or anything natural or artificial disaster`,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const generatedTweet = response.choices[0].text;
    const category = determineCategory(generatedTweet);

    // Find or create the user with the email 'climatewaver@gmail.com'
    const [user, created] = await User.findOrCreate({
      where: { email: 'climatewaver@gmail.com' },
      defaults: {
        id: uuidv4(),
        username: 'waverx',
        first_name: 'waverx',
        last_name: 'waverx',
        bio: 'waverx speaks',
        email: 'climatewaver@gmail.com',
        is_verified: true,
        is_active: true
      }
    });

    if (!created) {
      user.username = 'waverx';
      await user.save();
    }

    const postId = uuidv4();
    // Store the post with the user id
    const newPost = await Post.create({
      id: postId, 
      date_created: new Date(),
      content_text: generatedTweet,
      category,
      user_id: user.id // Associate the post with the user
    });

    res.status(201).json({ generatedTweet, category });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


function determineCategory(generatedTweet) {
  const categoryKeywords = {
    Community: ['community', 'local', 'together'],
    Education: ['education', 'learn', 'teach', 'knowledge'],
    Reports: ['report', 'information', 'data'],
  };

  for (const category in categoryKeywords) {
    const keywords = categoryKeywords[category];
    const foundKeyword = keywords.find(keyword => generatedTweet.toLowerCase().includes(keyword));
    if (foundKeyword) {
      return category;
    }
  }

  return "Education";
}

async function getAllEducationalTweets(req, res) {
  try {
    const educationalTweets = await Post.findAll();
    res.status(200).json({ tweets: educationalTweets });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  generateEducationalTweet,
  getAllEducationalTweets
};
