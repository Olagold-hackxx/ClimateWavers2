// src/handlers.js
const wsHandlers = new Set();

function handleConnection(socket) {
  console.log('Client connected');
  wsHandlers.add(socket);

  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Handle incoming messages and send notifications here
  });

  socket.on('close', () => {
    console.log('Client disconnected');
    wsHandlers.delete(socket);
  });
}

module.exports = { handleConnection, wsHandlers };

