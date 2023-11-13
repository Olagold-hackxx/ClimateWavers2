const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const { authRouter, currentSession } = require("./src/routers/auth");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const passport = require("passport");
const dbConnect = require("./src/utils/dbconnect");
const port = process.env.PORT;
const flash = require("express-flash");
app.use(flash());

// connect database
const connectMariaDB = async () => {
  try {
    dbConnect;
    await dbConnect.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectMariaDB();

app.use(morgan("tiny"));
app.use(
  cors({
    origin: process.env.BASE_URL,
  })
);

//built-in middleware for json
app.use(express.json());

//express session middleware
app.use(currentSession);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use(cookieParser(process.env.JWT_SECRET));
app.use(passport.initialize());

// setup routes
app.use("/api/v1/auth", authRouter);

app.get("/error", (req, res) => {
  try {
    const error = req.flash("error");
    console.log(error);
    return res.status(401).json({ error });
  } catch (err) {
    return res.status(401).send(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${port}`);
});
