const express = require('express');
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./logger');
const chatBotRoutes = require('./routes/chatBotRoutes');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Use middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/api', chatBotRoutes);

app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
