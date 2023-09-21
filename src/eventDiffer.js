/**
 * Compare two events and return the differences.
 * @param {Object} oldEvent - The original event object.
 * @param {Object} newEvent - The new event object.
 * @returns {Array} - An array of differences.
 */
function compareEvents(oldEvent, newEvent) {
    const differences = [];

    Object.keys(oldEvent).forEach(key => {
        if (oldEvent[key] !== newEvent[key]) {
            differences.push({
                field: key,
                oldValue: oldEvent[key],
                newValue: newEvent[key]
            });
        }
    });

    return differences;
}

module.exports = compareEvents;





// Example data
const oldEventData = {
    eventName: 'Tech Conference 2023',
    eventURL: 'https://tech-conference-2023.com',
    eventType: 'Conference'
};

const newEventData = {
    eventName: 'Tech Conference 2023',
    eventURL: 'https://tech-conference-2023-updated.com',
    eventType: 'Conference'
};

const differences = compareEvents(oldEventData, newEventData);
console.log(differences);
// Output: [ { field: 'eventURL', oldValue: 'https://tech-conference-2023.com', newValue: 'https://tech-conference-2023-updated.com' } ]
