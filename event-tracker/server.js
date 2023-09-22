require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database'); // Import database configuration
const eventsRouter = require('./routes/events');
const notificationsRouter = require('./routes/notifications');
const dashboardRoutes = require('./routes/dashboardRoutes');




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

// Then, after initializing your Express app
app.use('/events', eventsRouter);
app.use('/notifications', notificationsRouter);
app.use(dashboardRoutes);
// You can further include other routes here:
// Example: app.use('/events', eventsRouter);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
