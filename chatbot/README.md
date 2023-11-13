# waverX

## Overview

The ChatBot application is a Node.js-based microservice that utilizes various technologies to interact with users through AI-powered responses. It handles messaging via Kafka, stores conversations in MongoDB, and employs OpenAI for generating responses.

## Technologies

- Node.js
- Express
- MongoDB (Atlas)
- MariaDB/MySQL
- Kafka
- OpenAI
- Axios
- Others...

## Getting Started

1. **Installation:** Run `npm install` to install all dependencies.
2. **Environment Setup:** Create a `.env` file and add these environment variables.
OPENAI_API_KEY, MYSQL_USER MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_HOST, MYSQL_DIALECT
3. **Running the Application:** Execute `npm start` or `node app.js` in the project directory to launch the application.

## Usage

The application communicates using kafka and handles messages for user queries related to climate and disaster-related topics.

## File Structure

The project follows a standard MVC architecture, separating models, views, and controllers. Significant files include:
- `app.js`: Main application file
- `controllers/chatBotController.js`: Controller handling incoming messages
- ...

## Database Setup

- **MongoDB (Atlas):** Connect to your MongoDB instance using the provided connection string.
- **MariaDB/MySQL:** Configure the Sequelize connection to your database.

## Kafka Event Handling

The application utilizes Kafka for messaging and handles incoming and outgoing messages via Kafka topics.

## Contributing

Contributions are welcome! Please follow the code standards outlined in CONTRIBUTING.md and submit pull requests.

## Error Handling

Errors are handled and logged using the integrated logger. The application provides graceful error responses.

## Deployment

For deployment, ensure all environment variables are set correctly and run the application on your server or preferred platform.
The application will be deployed on openshift platform for the purpose of the 2023 hackathon.

## Known Issues

Currently, there are no known major issues. Please report any problems in the 'Issues' section.

## License

This project is shared under the [MIT License](#).

## Contact Information

For support or queries, reach out to me on masterjoetech@gamil.com