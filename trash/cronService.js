const cron = require('node-cron');
const eventService = require('./eventService');
const scrapeTradeShow = require('../scrapers/tradeShowScraper');
const scrapeConference = require('../scrapers/conferenceScraper');
const notificationService = require('./notificationService');

const cronService = {
    startCronJobs() {
        // For example, run every Monday at 9AM
        cron.schedule('0 9 * * MON', async () => {
            try {
                const events = await eventService.getAllEvents();
                
                for (let event of events) {
                    let scrapedData;

                    if (event.eventType === 'Trade Show') {
                        scrapedData = await scrapeTradeShow(event.eventURL);
                    } else if (event.eventType === 'Conference') {
                        scrapedData = await scrapeConference(event.eventURL);
                    }
                    
                    // Compare scrapedData with stored event data
                    // If changes detected, send notification and log the change
                    if (scrapedData.title !== event.eventName) {
                        // This is a basic comparison; you may need more comprehensive logic
                        await notificationService.sendNotification('recipient@example.com', 'Event Changed', `The event ${event.eventName} has changed its title to ${scrapedData.title}.`);
                        
                        await notificationService.logChange({
                            event: event._id,
                            changes: [
                                {
                                    field: 'title',
                                    oldValue: event.eventName,
                                    newValue: scrapedData.title
                                }
                            ]
                        });

                        await eventService.updateEvent(event._id, { eventName: scrapedData.title });
                    }
                }

                console.log('Cron job executed successfully.');
            } catch (error) {
                console.error('Error in cron job:', error.message);
            }
        });
    }
};

module.exports = cronService;
