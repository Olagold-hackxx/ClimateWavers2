# waverX speaks

## Overview

waverX speaks is a Tweet Generator Chatbot, Its a Node.js application that leverages the OpenAI platform to generate educational tweets on topics related to natural and artificial disasters. It uses an Axios HTTP client for data fetching and storage, integrating Sequelize for database operations. The application provides API endpoints for creating educational tweets and retrieving them from the database.

## Technologies

- Node.js
- Express
- Sequelize
- Axios
- OpenAI
- Others...
 
## Getting Started

1. **Installation:** Run `npm install` to install dependencies.
2. **Environment Setup:** Set up a `.env` file with the necessary environment variables.
OPENAI_API_KEY, MYSQL_USER MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_HOST, MYSQL_DIALECT
3. **Running the Application:** Start the application using `npm start` or `node app.js` in the project directory.

## Functionality

The chatbot generates educational tweets by querying the OpenAI model and saves them to the database. Users can access these tweets via API endpoints.

## File Structure

The application is structured into controllers, routes, and models:

- `controllers/`: Contains the business logic for generating educational tweets and handling API requests.
- `routes/`: Manages the API endpoints for interacting with the chatbot.
- `models/`: Defines the data models for educational tweets and stores them in the database.

## Database

The application stores educational tweets in a database managed by Sequelize. It employs the EducationPost model for handling these tweets.

## Chatbot Operations

### `generateEducationalTweet`

- **Description:** Generates an educational tweet related to climate, earthquakes, disasters, etc.
- **Method:** `POST`
- **Route:** `/generate-educational-tweet`

to test this endpoit using postman, send a POST request to localhost:3001/api/generate-educational-tweet
### `getAllEducationalTweets`

- **Description:** Retrieves all educational tweets from the database.
- **Method:** `GET`
- **Route:** `/educational-tweet`

to test this endpoit using postman, send a GET request to localhost:3001/api/generate-educational-tweet
## Error Handling

The application uses middleware for error logging and returns appropriate error messages to the user.

## Usage

- The API endpoints can be accessed to generate and retrieve educational tweets.

## Deployment
We provide three different methods for deploying this microservice to openshift clusters. 
### Import Git Repositoy (Recommended)
Use the import git repository feature on openshift console.
- Navigate to Add page in the Developer console on openshift
- Select Dockerfile strategy
- Deployment type should be Deployment Config
- Secure routes
- Set the environment variables after deployment
  
### Automated Command line Deployment
Using the scripts provided in `automate_development` folder, simplifies deployment. To use the scripts, docker and oc must be installed.

#### Build and push image
You can replace the image repository in the scripts `build.sh` in `automate_deployment` or use the repository we provided.
  ```bash
   automate_deployment/./build.sh
   ```
#### Deploy 
If the image repository was changed when building, update the `development.yaml` file in `k8s` folder with your image repository
  ```bash
   automate_deployment/./deploy.sh
   ```

### Tekton pipeline deployment script
Deploy with tekton with the pipeline deployment script in `automated_deployment` directory. Setup environments variables after deployments
   ```bash
   automate_deployment/./tekton_pipeline.sh
   ```


## Known Issues

There are no known issues at this time. Feel free to open an issue if you encounter any problems.

## License

This project is shared under the [MIT License](#).

## Contact Information

For support or queries, please contact me at masterjoetech@gmail.com
