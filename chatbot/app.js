const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chatBotRoutes = require('./routes/chatBotRoutes');
const cors = require('cors');
const path = require('path');
const { WebSocket } = require('./websocket');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Replace this with your MongoDB Atlas connection string
const atlasConnectionString = 'mongodb+srv://climate:climate@cluster0.nel0lco.mongodb.net/?retryWrites=true&w=majority';

// Connect to the MongoDB Atlas cluster
(async () => {
  try {
    await mongoose.connect(atlasConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
})();
mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.static(path.join(__dirname, 'views'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', chatBotRoutes);

// Start the WebSocket server
WebSocket.setupWebSocketServer(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

