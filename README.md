# waverX

## Overview

Welcome to waverX ChatBot! This chatBot provides answers to questions related to climate and disaster.
This README provides an in-depth guide on setting up, using, and contributing to this project.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [Usage](#usage)
3. [Project Structure](#project-structure)
4. [Contributing](#contributing)
5. [License](#license)
6. [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB and MariaDB (or the database of your choice) installed and running
- API keys for OpenAI (for generating chatbot responses)

### Installation

1. Clone the repository:

   git clone https://github.com/ClimateWavers/chatBot.git
   cd chatbot

    Install dependencies:


    npm install

Set up environment variables:

    Create a .env file in the root directory and add the following:

env

OPENAI_API_KEY=your-openai-api-key

Replace the placeholders with your actual values.

Go to the config/config.js file set these with actual values from your mongoDb  
    username: 'your_username',
      password: 'your_password',
      database: 'post',
      host: 'localhost',
      dialect: 'mysql',



Finally go to db/mariaDb.js file

Replace the placeholders with your actual values.

Start the server:


    npm start

Usage
API Endpoints

    /api/:userId/chatbot (POST): Send a message to the chatbot.
    /api/generate-educational-tweet (POST): Generate an educational tweet about climate or disasters.
    /api/educational-tweet (GET): Get a list of educational tweets.

ChatBot Usage

    Send a POST request to /api/:userId/chatbot with a JSON body containing message and userLocation.
    If the message is a greeting, the chatbot will respond with a welcome message.
    If it's not a greeting, the chatbot will generate responses using the OpenAI GPT-3 model.

Project Structure

    app.js: Entry point for the Express application.
    controllers/: Contains controllers for handling API routes.
    models/: Defines MongoDB and MariaDB (Sequelize) data models.
    routes/: Defines API routes.
    logger.js: Custom logger for the application.
    views/: Frontend views (if applicable).

Contributing

We welcome contributions from the community! To contribute to this project, please follow these steps:

    Fork the repository.
    Create a new branch for your feature or bug fix.
    Implement your changes and ensure they are well-documented and tested.
    Create a pull request to the main branch of the original repository.
    Wait for a maintainer to review your PR.

License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

We would like to express our gratitude to the following libraries and tools that make this project possible:

    Express.js
    Mongoose
    Sequelize
    OpenAI GPT-3
