const express = require('express');
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const helmet = require('helmet'); 
const logger = require('./logger'); 
const cors = require('cors');
const path = require('path');
const tweetRoutes = require('./routes/eduTweetRoutes');
const app = express();
const port = process.env.PORT || 3001;



app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use('/api', tweetRoutes);

app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});


app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
