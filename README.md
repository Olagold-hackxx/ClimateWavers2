# Chat Interface Microservice

## Overview

The Chat Interface Microservice in the ClimateWavers application serves as the communication bridge between the frontend and Kafka. It provides APIs that the frontend can call to interact with the Kafka messaging system.

## Technologies Used

- Node.js: The server-side runtime for running JavaScript code.
- Express.js: A web application framework for Node.js used to build robust APIs.
- Kafka: A distributed event streaming platform for handling real-time data feeds.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/climatewavers-chat-interface.git
   ```

2. Install dependencies:

   ```bash
   cd climatewavers-chat-interface
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file and configure the following variables:

   ```env
   KAFKA_BROKER_URL=your_kafka_broker_url
   KAFKA_TOPIC=your_kafka_topic
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

   The server will be running on the specified port (default is 3000).

2. Frontend Integration:

   Integrate the provided APIs into your frontend application to enable real-time messaging using Kafka.

## API Endpoints

### 1. Produce Message

- **Endpoint**: `/produce-message`
- **Method**: POST
- **Description**: Produces a message to the Kafka topic.
- **Request Body**:

  ```json
  {
    "message": "Your message content"
  "userId": "e9d11e91-2db8-4ae9-ab62-367f278cc1ed",
  "userLocation": {"latitude": 40.73061, "longitude": -73.935242}
  }
  ```

### 2. Consume Messages

- **Endpoint**: `/consume-messages`
- **Method**: GET
- **Description**: Consumes messages from the Kafka topic.
- **Response**:

  ```json
  {
    "messages": ["Message 1", "Message 2", ...]
  }
  ```
## Deployment
We provide three different methods for deploying this microservice to openshift clusters.
### Import Git Repositoy (Recommended)
Use the import git repository feature on openshift console.
- Navigate to Add page in the Developer console on openshift
- Select Dockerfile strategy
- Deployment type should be Deployment Config
- Secure routes
- Supply the environment variables after deployment
  
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
Deploy with tekton with the pipeline deployment script in `automated_deployment` directory. Setup environment variabes after deployment
   ```bash
   automate_deployment/./pipeline.sh
   ```

  ## Deployment
We provide three different methods for deploying this microservice to openshift clusters.
### Import Git Repositoy (Recommended)
Use the import git repository feature on openshift console.
- Navigate to Add page in the Developer console on openshift
- Select Dockerfile strategy
- Deployment type should be Deployment Config
- Secure routes
- Supply the environment variables after deployment
  
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
Deploy with tekton with the pipeline deployment script in `automated_deployment` directory
   ```bash
   automate_deployment/./tekton_pipeline.sh
   ```

## License

This project is licensed under the [MIT License](LICENSE).
