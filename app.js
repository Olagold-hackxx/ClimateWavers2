// Import necessary modules and libraries
const express = require('express');
const bodyParser = require("body-parser");
const routes = require('./routes/routes');


const app = express(); 
const port = process.env.PORT || 3003; 

// Middleware setup
app.use(express.json()); 
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error('Error:', err); 
  res.status(500).json({ error: 'Internal server error' }); 
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});
