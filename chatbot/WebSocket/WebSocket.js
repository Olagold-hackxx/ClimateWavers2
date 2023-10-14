const WebSocket = require('ws');

let wss;

function setupWebSocketServer(server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    // Handle WebSocket connections here
  });

  wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  WebSocket.sendToUser = (userId, data) => {
    // Find the WebSocket connection associated with the user ID and send data
    // You will need to implement this function based on your user-to-WebSocket mapping
    // Example: wss.clients.find(client => client.userId === userId).send(data);
  };
}

module.exports = {
  WebSocket,
  setupWebSocketServer,
};

