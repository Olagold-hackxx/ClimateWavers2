// controllers/emailController.js
const Email = require('../models/emailModel');
const User = require('../models/userModel');
const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');
const OpenAI = require("openai");
const openai = new OpenAI();



async function sendEmailController(req, res) {
    try {
        const { location, disasterType } = req.body;

        const [user, created] = await User.findOrCreate({
            where: { email: 'climatewaver@gmail.com' },
            defaults: {
                id: uuidv4(),
                username: 'waverx',
                first_name: 'waverx',
                last_name: 'waverx',
                bio: 'waverx speaks',
                email: 'climatewaver@gmail.com',
                updated_at: new Date(),
                created_at: new Date(),
                is_verified: true,
                is_active: true,
            },
        });

        if (!created) {
            user.username = 'waverx';
            await user.save();
        }


        const aimessage = await generateOpenAIResponse(disasterType)

        // Fetch users in the specified location
        const usersInLocation = await User.findAll({
            where: { last_location: location },
        });

        // Send emails to users in the specified location
        for (const userInLocation of usersInLocation) {
            const emailData = {
                to: userInLocation.email,
                subject: `Disaster happening in ${location}`,
                text: `Hi ${userInLocation.first_name}, ${aimessage}`,
            };

            const info = await Email.sendEmail(emailData);
            logger.info(`Email sent to ${userInLocation.email}: ` + info.response);
        }

        res.send('Emails sent successfully to users in the specified location');
    } catch (error) {
        logger.error('Error occurred: ', error);
        res.status(500).send('Error sending emails');
    }
}

async function generateOpenAIResponse(disasterType) {
  try {
    
    const text = `Generate a message for our user based on disaster type ${disasterType}, do not start with dear user, add sincerely waverx at the end`;
 

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
  
module.exports = { sendEmailController };
