require('dotenv').config(); // Load environment variables from .env file
const app = require('./app');

// Define the port where your application will run
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});