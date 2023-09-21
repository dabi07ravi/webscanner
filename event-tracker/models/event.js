const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        trim: true
    },
    eventURL: {
        type: String,
        required: true,
        unique: true
    },
    eventType: {
        type: String,
        enum: ['Trade Show', 'Conference'],
        required: true
    },
    lastScraped: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
