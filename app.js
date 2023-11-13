const express = require('express');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes');
const logger = require('./logger');

const port = process.env.PORT || 3002;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the email routes
app.use('/api', emailRoutes);


app.use((err, req, res, next) => {
    logger.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });
  
  
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });