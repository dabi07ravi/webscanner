const express = require('express');
const router = express.Router();
const ChangeLog = require('../models/changeLog');

// Send notifications (just a placeholder for now)
router.post('/send', async (req, res) => {
    try {
        // Logic to send notification based on detected changes
        res.json({ message: "Notification sent." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
