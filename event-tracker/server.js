require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database'); // Import database configuration



//ravi changes
const eventRouter = require('./routes/event.router');
const chkEventRouter = require('./routes/change_event.router')



const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection using configurations from the config folder
mongoose.connect(dbConfig.mongoURI, dbConfig.options)
    .then(() => {
        console.log('Connected to MongoDB.');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Middleware to parse JSON data
app.use(express.json());


// Placeholder route for testing
app.get('/', (req, res) => {
    res.send('Event Tracker API is up and running!');
});
//api
//ravi changes
app.use('/api', eventRouter);
app.use('/api',chkEventRouter);



// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    require("./cron.js")
});
