const express = require('express');
const router = express.Router();
const eventService = require('../services/eventService');
const notificationService = require('../services/notificationService');

router.get('/dashboard', async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        const notifications = await notificationService.getRecentNotifications();
        
        res.render('dashboard', { events, notifications });
    } catch (error) {
        // Here you might want to use your errorHandler or logger to handle/log the error
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
