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
- [Contributing](#contributing)
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

## Architecture

Climate Wavers follows a microservices architecture to ensure modularity, scalability, and maintainability.

**Architecture Components:**
- Frontend (React)
- Backend (Django)
- Auth Flow (Node.js)
- Chatbot (MongoDB)
- Tweetbot
- Model Bot
- Database Microservice (MariaDB)
- WaverX-NLP Microservice
- WaverX-Analysis
- WaverX-Vision

![Architecture Diagram](./docs/architecture-diagram.png)

## Microservices

### Frontend (React)

- **Repository:** `frontend/`
- **Description:** The React application provides the user interface for the Climate Wavers platform.

### Backend (Django)

- **Repository:** `backend/`
- **Description:** The Django backend houses the core application logic and APIs.

### Auth Flow (Node.js)

- **Repository:** `authflow/`
- **Description:** Node.js application managing open authentication and Red Hat SSO.

### Chatbot

- **Repository:** `chatbot/`
- **Description:** MongoDB for storing chat conversations with users.

### Tweetbot

- **Repository** `tweetbot/`
- **Description:** Generates educational posts on disasters.

### Model Bot

- **Repository** `modelbot/`
- **Description:** Generates model responses.

### Database Microservice (MariaDB)

- **Repository** `database/`
- **Description:** MariaDB database connecting all microservices.

### WaverX-NLP Microservice

- **Repository** `waverx-nlp/`
- **Description:** NLP model for natural language processing.

### WaverX-Analysis

- **Repository** `waverx-analysis/`
- **Description:** Disaster magnitude analysis model.

### WaverX-Vision

- **Repository** `waverx-vision/`
- **Description:** Vision model for image analysis.

## Deployment

The application is deployed on OpenShift, a robust container orchestration platform, ensuring scalability and reliability.

**Deployment Configurations:**
- Configuration files are available in the `openshift/` directory.

## Getting Started

1. Clone the repository: `git clone https://github.com/yourusername/climate-wavers.git`
2. Follow the README in each microservice repository for specific setup instructions.

## Contributing

We welcome contributions from the community! Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the [MIT License](LICENSE).
