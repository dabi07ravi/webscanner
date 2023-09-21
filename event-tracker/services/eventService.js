const Event = require('../models/event');

const eventService = {
    async getAllEvents() {
        return await Event.find();
    },

    async createEvent(data) {
        const event = new Event(data);
        return await event.save();
    },

    async updateEvent(id, data) {
        return await Event.findByIdAndUpdate(id, data, { new: true });
    },

    async deleteEvent(id) {
        return await Event.findByIdAndDelete(id);
    },

    // Add more service methods as required
};

module.exports = eventService;
