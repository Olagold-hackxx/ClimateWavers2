const axios = require('axios');
const OpenAI = require("openai");
const logger = require('../logger');
const openai = new OpenAI();
const { format } = require('date-fns');
const CircularJSON = require('circular-json');

async function chatBot(req, res) {
  try {
    const { message, location, username, postId } = req.body;

    
    // Axios request to fetch NLP response
    const nlpResponse = await axios.post('https://waver-x-nlp-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/nlp/model/waverx', `text=${message}`);
    const prediction = nlpResponse.data.prediction;

    const currentDate = new Date();

    // Calculate the next day
    const nextDay = new Date();
    nextDay.setDate(currentDate.getDate() + 1);

    // Format the dates in 'YYYY-MM-DD' format
    const startDate = format(currentDate, 'yyyy-MM-dd');
    const endDate = format(nextDay, 'yyyy-MM-dd');
    const nlpRes = await OpenAINlp(nlpResponse, message);


    const data = new URLSearchParams();
    data.append('apiKey', 'R9M7HHCH4EDADEUBCU3ZENKXN');
    data.append('location', location);
    data.append('startDate', startDate);
    data.append('endDate', endDate);
    data.append('disasterType', nlpRes);

    
    // Axios request to post data for analysis
    const analysisResponse = await axios.post('https://waver-x-analysis-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/analysis/model/waverx', data);
   const parsedResponse = CircularJSON.stringify(analysisResponse.data);

    // Pass the analysis response and message to the OpenAI function
    const aiResponse = await generateOpenAIResponse(parsedResponse, nlpRes, message, username);
    // Send the final response
    res.status(201).json({ response: aiResponse });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function generateOpenAIResponse(parsedResponse, nlpRes, message, username) {
  try {
    const usern = "Buhari"
    let alt = ` what ${parsedResponse} means`
    let arr = ['Storm', 'Earthquake', 'Flood'];
    nlpRes = nlpRes.charAt(0).toUpperCase();
    if (!arr.includes(nlpRes)) {
      alt = `Why and why not the ${nlpRes} will occur`

    }
    
    
    const text = `user's post is ${message}, nlp model returns ${nlpRes}
                   and our analysis model returns ${parsedResponse}. 
                  Compare the information, let the user also help by providing proof like pictures or videos of the disaster
                  write a personalized message explaining to the user, ${alt} 
                  the user's name is ${usern} add sincerely waverx at the end
                  `;

    // Generate a response using OpenAI
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `${text}`,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return completion.choices[0].text;
  } catch (error) {
    logger.error('Error in generateOpenAIResponse:', error);
    throw error;
  }
}


async function OpenAINlp(prediction, message) {
  try {
    
    const text = ` the user says ${message} and the nlp model predicts ${prediction}
                confirm and provide what label the user message suits most in the following labels
                Earthquake, Drought, Damaged infrasture, Human Damage, Human, Landslide, Non Damage Buildings and Street,
                Non Damaged Wildlife Forest, Sea, Urban Fire, Wild Fire, Water Disaster, Humanitarian Aid
                return only the label
                `;

    // Generate a response using OpenAI
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `${text}`,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return completion.choices[0].text;
  } catch (error) {
    logger.error('Error in generateOpenAIResponse:', error);
    throw error;
  }
}



module.exports = {
  chatBot
};
