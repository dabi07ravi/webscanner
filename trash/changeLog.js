const mongoose = require('mongoose');

const changeLogSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    changedAt: {
        type: Date,
        default: Date.now
    },
    changes: [{
        field: String,
        oldValue: String,
        newValue: String
    }]
});

const ChangeLog = mongoose.model('ChangeLog', changeLogSchema);

module.exports = ChangeLog;
