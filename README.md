# ClimateWavers Notification System

This notification system facilitates the sending of climate-related alerts to registered users based on their last known location. It leverages email notifications for alert dissemination.

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Code Structure](#code-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The ClimateWavers Notification System employs a series of interconnected modules to handle the process of sending climate-related notifications to users.

## Setup

1. **Clone Repository**

   ```bash
   git clone https://github.com/Olagold-hackxx/ClimateWavers2.git


Install Dependencies

cd ClimateWavers2/notification-service
npm install

## Environment Variables

Ensure to set up the following environment variables:

- `EMAIL_USER`: Email service username
- `EMAIL_PASSWORD`: Email service password
- `EMAIL_SERVICE`: Email service provider (e.g., Gmail)

Create a `.env` file in the root of the `notification-service` folder and add the environment variables.

## Code Structure

The notification system comprises the following key files:

- `EmailNotificationController.js`
- `handlers.js`
- `models.js`
- `emailService.js`
- `main.js`
- `senders.js`

The functionalities of these files are as follows:

- `EmailNotificationController.js`: Handles incoming messages and user locations to dispatch email notifications.
- `handlers.js`: Manages the connections and triggers notifications.
- `models.js`: Defines the structure for notification data.
- `emailService.js`: Manages the service for sending emails.
- `main.js`: Coordinates the trigger for sending notifications.
- `senders.js`: Specifies the process of sending email notifications.

## Usage

The system allows for the dispatch of climate-related alerts to users based on their last known location. To utilize the notification system, follow these steps:

1. **Start the Service**

   Run the following command in the `notification-service` directory:

   ```bash
   npm start

Connect to the System

Connect to the specified port to start receiving notifications.

Test the System

To test the system, simulate different scenarios and check the functionality of the email notifications.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/awesome-contribution).
Commit changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/awesome-contribution).
Create a pull request.

License
This project is licensed under the MIT License.
