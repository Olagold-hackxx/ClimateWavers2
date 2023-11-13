// Import necessary modules and libraries
const express = require('express');
require("dotenv").config(); 
const bodyParser = require("body-parser");
const mongoose = require('mongoose'); 
const { sequelize } = require('./db/mariaDb'); 

const morgan = require('morgan'); 
const helmet = require('helmet'); 
const logger = require('./logger'); 
const cors = require('cors'); 
const path = require('path');

const app = express(); 
const port = process.env.PORT || 3000; 
const chatBot = require('./controllers/chatBotController'); 

// Connection string for MongoDB Atlas
const atlasConnectionString = 'mongodb+srv://climate:climate@cluster0.nel0lco.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
(async () => {
  try {
    await mongoose.connect(atlasConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info('Connected to MongoDB Atlas'); 
  } catch (err) {
    logger.error('Error connecting to MongoDB:', err); 
  }
})();

// Middleware setup
app.use(express.json()); 
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(helmet()); 
app.use(morgan('combined')); 
app.use(cors()); 

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err); 
  res.status(500).json({ error: 'Internal server error' }); 
});

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`); 
});
