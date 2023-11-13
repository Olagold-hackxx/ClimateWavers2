# ClimateWavers Frontend Microservice Readme

## Overview

The ClimateWavers Frontend Microservice is the user interface of the ClimateWavers application. It is built using React, Redux, React Query, Hook Form, and styled with Tailwind CSS. The microservice is responsible for providing an engaging and user-friendly experience to the end-users while interacting with the ClimateWavers platform.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Redux: A state management library for managing the global state of the application.
- React Query: A data fetching library for React applications.
- Hook Form: A library for managing forms in React using hooks.
- Tailwind CSS: A utility-first CSS framework for building responsive and design-friendly interfaces.

## Features

- **User Authentication**: Secure user authentication using industry-standard protocols.
- **Real-time Messaging**: Integration with the Chat Interface Microservice for real-time messaging.
- **Data Visualization**: Visual representation of climate-related data for better understanding.
- **Form Management**: User-friendly forms powered by Hook Form for efficient data entry.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/climatewavers-frontend.git
   ```

2. Install dependencies:

   ```bash
   cd climatewavers-frontend
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file and configure the necessary variables such as API endpoints, authentication details, etc.

   ```env
   REACT_APP_API_URL=https://api.climatewavers.com
   REACT_APP_CHAT_API_URL=https://chat-api.climatewavers.com
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:3000`.

2. Build for production:

   ```bash
   npm run build
   ```
  The production build will be available in the `build` directory.

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
