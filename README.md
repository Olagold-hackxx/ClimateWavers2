# Notification and Alerting System Microservice for Climate Wavers

## Overview

Welcome to the Notification and Alerting System microservice for Climate Wavers, an AI-driven disaster response platform. This microservice is designed to deliver timely and personalized alerts to users based on their last known location, providing crucial information about impending disasters.

## Features

### 1. Disaster Alerts

Receive real-time alerts about potential disasters, including but not limited to hurricanes, floods, wildfires, and more. Alerts messages are generated from chatGPT based on predicted disaster type and model analysis

### 2. Location-Based Notifications

Tailor notifications based on the user's last known location, ensuring relevance and accuracy in disaster alerts.

### 3. Personalized Settings

Allow users to customize their notification preferences, including the types of disasters they want to be alerted about and the frequency of notifications.

### 4. Emergency Contacts

Provide a feature for users to add emergency contacts who will also receive alerts on their behalf, ensuring a network of safety.

## Getting Started

Follow these steps to set up and run the Notification and Alerting System microservice:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/climatewavers/Notification-System.git
   ```

2. **Install Dependencies:**
   ```bash
   cd climate-wavers-notifications
   npm install
   ```

3. **Configuration:**
   - Configure the microservice settings, including API keys for geolocation services and disaster prediction models.

4. **Run the Microservice:**
   ```bash
   npm start
   ```

5. **API Documentation:**
   Access the API documentation at [http://localhost:3000/docs](http://localhost:3000/docs) for details on available endpoints and usage.

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



## Contributing

We welcome contributions to enhance the functionality and features of the Notification and Alerting System. Feel free to open issues or submit pull requests.

## License

This microservice is licensed under the [MIT License](LICENSE), allowing for both personal and commercial use.

## Support

For any questions or issues, please contact our support team at support@climatewavers.com.

Thank you for contributing to Climate Wavers, and together, let's build a safer and more resilient world! 🌍🌊🔔
