const express = require('express');
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
//const messageRoutes = require('./routes/messageRoutes'); // Import the message routes
const chatBotRoutes = require('./routes/chatBotRoutes'); // Import the chatbot routes
const cors = require('cors');
const path = require('path');




//const messageRout = require('./routes/messageRoutes');
//const helmet = require('helmet');
//const morgan = require('morgan');
//const cors = require('cors');
//const expressValidator = require('express-validator');
//const rateLimit = require('express-rate-limit');
//const session = require('express-session');
//const winston = require('winston');
//const errorHandler = require('./middlewares/errorHandler');

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




// Middleware Setup
//app.use(helmet());
//app.use(morgan('dev'));
//app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
//app.use(expressValidator());
//app.use(session({
  //secret: 'your-secret-key',
  //resave: false,
  //saveUninitialized: true,
//}));
//app.use('/api', messageRoutes);
app.use('/api', chatBotRoutes); // You can specify the base path (e.g., '/api') as needed
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
