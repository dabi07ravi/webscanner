const express = require('express');
const router = express.Router();
const changeLogService = require('./changeLogService');

// Fetch change logs for a specific event
router.get('/logs/:eventId', async (req, res, next) => {
    try {
        const logs = await changeLogService.getChangeLogsForEvent(req.params.eventId);
        res.json(logs);
    } catch (error) {
        // Use your errorHandler or just send a generic error response
        next(error);
    }
});

// Fetch the most recent change logs across all events
router.get('/logs/recent/:limit?', async (req, res, next) => {
    try {
        const limit = parseInt(req.params.limit) || 10; // default limit is 10 if not specified
        const logs = await changeLogService.getRecentChangeLogs(limit);
        res.json(logs);
    } catch (error) {
        next(error);
    }
});

router.post('/logs/compare-and-log', async (req, res, next) => {
    try {
        const { oldEvent, newEvent } = req.body;

        // Validate the input as needed

        const differences = compareEvents(oldEvent, newEvent);

        if (differences.length) {
            // Assuming both oldEvent and newEvent have an '_id' field to identify them
            await changeLogService.logChange(newEvent._id, differences);
            res.status(201).json({ message: 'Changes detected and logged.', differences });
        } else {
            res.status(200).json({ message: 'No changes detected.', differences: [] });
        }

    } catch (error) {
        next(error);
    }
});


module.exports = router;
