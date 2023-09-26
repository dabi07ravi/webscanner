const ChangeLog = require('../models/ChangeLog');

const changeLogService = {

    /**
     * Logs a change for a specific event.
     * @param {mongoose.Types.ObjectId} eventId - The ID of the event that changed.
     * @param {Array} differences - The differences found by the eventDiffer.
     * @returns {Promise} - The promise of the MongoDB save operation.
     */
    async logChange(eventId, differences) {
        const logEntry = new ChangeLog({
            event: eventId,
            changes: differences
        });

        return logEntry.save();
    },

    /**
     * Fetches the change logs for a specific event.
     * @param {mongoose.Types.ObjectId} eventId - The ID of the event.
     * @returns {Promise<Array>} - The promise that resolves to an array of change logs.
     */
    async getChangeLogsForEvent(eventId) {
        return ChangeLog.find({ event: eventId })
            .populate('event') // If you want the associated event details too
            .sort({ changedAt: -1 });
    },

    /**
     * Fetches the most recent change logs across all events.
     * @param {number} limit - How many logs to retrieve (for pagination).
     * @returns {Promise<Array>} - The promise that resolves to an array of change logs.
     */
    async getRecentChangeLogs(limit = 10) {
        return ChangeLog.find()
            .populate('event') // If you want the associated event details too
            .sort({ changedAt: -1 })
            .limit(limit);
    }

    // Add more methods as necessary
};

module.exports = changeLogService;
