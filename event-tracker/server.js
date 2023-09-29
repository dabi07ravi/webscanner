require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/database"); // Import database configuration
const path = require('path');
//ravi changes
const eventRouter = require("./routes/event.router");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection using configurations from the config folder
mongoose
  .connect(dbConfig.mongoURI, dbConfig.options)
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Middleware to parse JSON data
app.use(express.json());

//api
//ravi changes
app.use("/api/event", eventRouter);

// Setting up EJS as view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});


// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  require("./cron.js");
});
