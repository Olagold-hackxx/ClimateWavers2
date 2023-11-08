class Notification {
  constructor(id, type, message, timestamp, userId) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.timestamp = timestamp;
    this.userId = userId; 
  }
}

module.exports = { Notification };

