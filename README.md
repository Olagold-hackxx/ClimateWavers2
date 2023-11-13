# Climate Wavers

Climate Wavers is an innovative AI-driven social media application designed to enhance disaster preparedness and response. The platform integrates community engagement, educational resources, and real-time disaster updates to create a comprehensive user experience.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Microservices](#microservices)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
- [Demo](#demo)
- [License](#license)

## Features

### 1. Community Pages
**Description:** Users can share information about their local climates, fostering community-driven collaboration.
**Functionality:**
- Post updates about local climates.
- Engage with climate experts and community members through discussions.

### 2. Educational Page

**Description:** An AI model generates educational posts on disasters to provide users with relevant and timely information.
**Functionality:**
- Dynamic content generation based on real-time disaster data.
- Educational posts tailored to user preferences.

### 3. Happening Now
**Description:** Real-time updates on disasters currently occurring around the world.
**Functionality:**
- Aggregation of real-time data feeds from authoritative sources.
- User notifications for relevant disasters based on location and preferences.

## Technology Stack

Climate Wavers is a disaster-driven social media application designed to prepare users for disasters and provide features to aid disaster response. The application utilizes a diverse set of technologies to deliver its functionality:

### Backend:

#### 1. Node.js and Express

- **Description:** Node.js is used as the backend runtime, and Express is the web application framework for building robust and scalable server-side applications.

#### 2. Django
- **Description:** Django, a high-level Python web framework, is employed to build the backend infrastructure, handle user authentication, and manage data.

#### 3. MariaDB
- **Description:** MariaDB, a MySQL fork, serves as the relational database management system for storing structured data related to users, posts, and application configurations.

#### 4. MongoDB
- **Description:** MongoDB, a NoSQL database, is used to store unstructured data such as chat conversations, providing flexibility in managing diverse data types.

#### 5. PyTorch, scikit-learn, and TensorFlow
- **Description:** These machine learning frameworks are integrated for various AI-driven functionalities, including disaster magnitude analysis and natural language processing.

#### 6. Intel PyTorch Extension and Intel scikit-learn Extension
- **Description:** Extensions provided by Intel optimize the performance of PyTorch and scikit-learn on Intel architectures, leveraging hardware acceleration.

#### 7. OpenVINO Quantization and OpenVINO Model Server
- **Description:** OpenVINO tools are utilized for model quantization and inference serving, optimizing deep learning models for edge computing and improving inference speed.

### Frontend:

#### 1. React
- **Description:** React is the JavaScript library used for building the user interface, providing a responsive and dynamic experience for Climate Wavers users.

### Redhat Integration:
#### 1. Red Hat SSO
- **Description:** Red Hat Single Sign-On is employed for secure user authentication, ensuring a seamless and secure login experience for Climate Wavers users.
#### 2. Red Hat AMQ Streams (Apache Kafka)
- **Description:** AMQ Streams, based on Apache Kafka, is used for reliable and scalable messaging between different components of the application, facilitating real-time data communication.

### Automation:
#### 1. Bash Automation
- **Description:** Bash scripts are used for automation tasks, streamlining deployment processes, and managing application configurations.

## Architecture
Climate Wavers follows a microservices architecture to ensure modularity, scalability, and maintainability.
**Architecture Components:**
- Frontend
- Backend
- Auth Flow
- Chatbot
- Tweetbot
- Model Bot
- Database Microservice
- WaverX-NLP Microservice
- WaverX-Analysis
- WaverX-Vision

![Architecture Diagram](https://github.com/Olagold-hackxx/ClimateWavers2/blob/1621d2f857769e9b83f396456210a896d8d3318a/climate_wavers.drawio.png)

## Microservices
### Frontend (React)
- **Repository:** `https://github.com/climatewavers/frontend`
- **Development branch:** Frontend
- **Description:** The React application provides the user interface for the Climate Wavers platform.

### Backend (Django)
- **Repository:** `https://github.com/climatewavers/backend`
- **Development branch:** Django-backend
- **Description:** The Django backend houses the core application logic and APIs.

### Auth Flow (Node.js)
- **Repository:** `https://github.com/climatewavers/authentication`
- **Development branch:** node-auth-flow
- **Description:** Node.js application managing open authentication and Red Hat SSO.

### Chatbot
- **Repository:** `https://github.com/climatewavers/waverx-chatbot`
- **Development branch:** chatbot
- **Description:** Chat conversations with users abd waverx bot, stored in Mongodb.

### Tweetbot
- **Repository** `https://github.com/climatewavers/waverx-tweet`
- **Development branch:** backend
- **Description:** Generates educational posts on disasters.

### Model Bot
- **Repository** `https://github.com/climatewavers/waverx-model`
- **Development branch:** modelbot
- **Description:** Model response system.

### Database (MariaDB)
- **Repository** `https://github.com/climatewavers/database`
- **Development branch:** database
- **Description:** MariaDB database connecting all microservices.

### WaverX-NLP Microservice
- **Repository** `https://github.com/climatewavers/waverx-nlp`
- **Development branch:** waverX-NLP
- **Description:** NLP model for natural language processing.

### WaverX-Analysis
- **Repository** `https://github.com/climatewavers/waverx-analysis`
- **Development branch:** waverX-Analysis
- **Description:** Disaster magnitude analysis model.

### WaverX-Vision
- **Repository** `https://github.com/climatewavers/waverx-vision`
- **Development branch:** waverX-Vision
- **Description:** Vision model for image analysis.

### Notification system
- **Repository** `https://github.com/climatewavers/Notification-System`
- **Development branch:** Notification-System
- **Description:** Alerting and notification system

## Deployment

The application is deployed on OpenShift, a robust container orchestration platform, ensuring scalability and reliability. The application was exported and redeployed 3 days before deadline to ensure it runs throughout judging period.
**Application sandbox details**:
Username: climatewavers
Email: Climatewaver@gmail.com
Password: Climatewaver2023

**Deployment Configurations:**
- Configuration files are available in the `k8s/` directory of the microservices branches and repositories.
- During development, deployment was done in three different ways.
        - Using the scripts provided in the `automate_deployment` directory of all microservice
        - Importing git repository on openshift cluster (recommended for some microservices)
        - Tekton pipeline
  ### Building Pipeline
  To use pipeline for deployment in the microservices, follow below script to deploy pipeline on your openshift namespace
  ```bash
  ./deploy_pipeline.sh
  ```
- More details on deployment in each microservice repository or branch
  
## Getting Started

1. Either clone all the microservices repository in the microservice account, which is recommended: `git clone https://github.com/climatewavers/{microservice name}`
or clone the development repository : `git clone https://github.com/olagold-hackxx/climatewavers2.git`
2. Follow the README in each microservice repository or branch in development repository for specific setup instructions.

## License

This project is licensed under the [MIT License](LICENSE).
