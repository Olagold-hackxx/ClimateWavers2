// notification-service/src/models.js

class Notification {
  constructor(id, type, message, timestamp, userId) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.timestamp = timestamp;
    this.userId = userId;
    // Add any additional fields as needed for your use case
    // Example: this.isRead = false;
  }

  // Add any additional methods for your use case
  // Example: markAsRead() {
  //   this.isRead = true;
  // }

  // a static method to create a notification from a data object
  static createFromData(data) {
    return new Notification(data.id, data.type, data.message, data.timestamp, data.userId);
  }
}

module.exports = { Notification };
