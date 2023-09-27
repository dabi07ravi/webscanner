const reportService = require('./services/reportService');
const eventService = require('../services/eventService');
const router = express.Router();

router.get('/report', async (req, res) => {
    try {
        const events = await eventService.getAllEvents(); // Fetch events from your database
        const reportBuffer = await reportService.generateEventReport(events);

        res.setHeader('Content-Disposition', 'attachment; filename=events_report.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(reportBuffer);
    } catch (error) {
        res.status(500).send("Error generating report.");
    }
});

module.exports = router;
