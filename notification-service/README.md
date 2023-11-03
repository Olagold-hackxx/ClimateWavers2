# ClimateWaver Social Media App Notification Service

This repository contains the Notification Service for ClimateWaver, a social media platform focused on climate-related issues. The service is responsible for sending email notifications related to climate alerts and updates to the app users.

## Email Integration

The Notification Service integrates with Gmail to send climate-related notifications to users via email. It utilizes Node.js along with the Nodemailer library to achieve this integration. Environment variables are used to securely store the email credentials and sensitive information.

### Email Service Setup

The `emailService.js` file handles the configuration of the email service and ensures the delivery of climate alerts to the registered users. The `.env` file is used to store sensitive information securely and is excluded from version control.

### WebSocket Update

In `handlers.js`, the service was updated to trigger email notifications on new connections instead of using WebSocket functionality. The WebSocket configurations in `config.js` remain unchanged to facilitate WebSocket connections.

## Files Modified

1. `emailService.js`: Configuration file for the email service.
2. `senders.js`: Incorporates the function to send email notifications.
3. `main.js`: Updated to trigger email notifications for climate-related alerts.
4. `handlers.js`: Modified to trigger email notifications on new connections.

## Installation

Before running the service, ensure you have Node.js installed. To install the necessary dependencies, run the following command:

```bash
npm install

## Run the Service

To start the Notification Service, use:

node main.js

