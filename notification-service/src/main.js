// src/main.js
const WebSocket = require('ws');
const { handleConnection } = require('./handlers');
const { port } = require('./config');
const { sendNotification, addClient, removeClient } = require('./senders');

const server = new WebSocket.Server({ noServer: true });

server.on('connection', (socket) => {
  // Handle the connection and add the client to the connectedClients list
  handleConnection(socket, sendNotification, addClient);
});

server.on('error', (err) => {
  console.error('WebSocket server error:', err);
});

module.exports = server;

// Start the WebSocket server
const httpServer = require('http').createServer();
httpServer.on('upgrade', (request, socket, head) => {
  server.handleUpgrade(request, socket, head, (socket) => {
    server.emit('connection', socket, request);
  });
});

httpServer.listen(port, () => {
  console.log(`WebSocket server is listening on port ${port}`);
});

