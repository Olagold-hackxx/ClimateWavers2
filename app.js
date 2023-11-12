// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { triggerEmailNotifications } = require('./notification-service/src/handlers'); 
const emailRoutes = require('./routes/route'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the email routes
app.use('/email', emailRoutes);

// Endpoint to trigger email notifications
app.post('/trigger-email-notifications', (req, res) => {
  triggerEmailNotifications();
  res.send('Email notifications triggered successfully');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
