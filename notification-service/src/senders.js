// src/senders.js

// Define functions for sending notifications

const { Notification } = require('./models');

// Maintain a list of connected clients
const connectedClients = new Set();

// Function to send a notification to all connected clients
function sendNotification(type, message) {
  const timestamp = new Date().toISOString();
  const notification = new Notification(1, type, message, timestamp);
  const notificationJSON = JSON.stringify(notification);

  connectedClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(notificationJSON);
    }
  });
}

// Function to add a client to the connectedClients list
function addClient(client) {
  connectedClients.add(client);
}

// Function to remove a client from the connectedClients list
function removeClient(client) {
  connectedClients.delete(client);
}

// Export notification functions
module.exports = { sendNotification, addClient, removeClient };

