const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new event
router.post('/', async (req, res) => {
    const event = new Event({
        eventName: req.body.eventName,
        eventURL: req.body.eventURL,
        eventType: req.body.eventType
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an event
router.patch('/:id', async (req, res) => {
    // Logic to update event based on provided ID
});

// Delete an event
router.delete('/:id', async (req, res) => {
    // Logic to delete event based on provided ID
});

module.exports = router;
