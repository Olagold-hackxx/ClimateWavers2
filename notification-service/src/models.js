// src/models.js

// Define data models for notifications

// Notification model
class Notification {
  constructor(id, type, message, timestamp) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.timestamp = timestamp;
  }
}

// Export the Notification model
module.exports = { Notification };

