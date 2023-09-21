const ExcelJS = require('exceljs');

const reportService = {
    /**
     * Generates an Excel report for the given event data.
     * @param {Array} events - The list of events.
     * @returns {Buffer} - A buffer representing the Excel file.
     */
    async generateEventReport(events) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Events');

        // Define columns for the worksheet
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Event Name', key: 'eventName', width: 30 },
            { header: 'Event URL', key: 'eventURL', width: 50 },
            { header: 'Event Type', key: 'eventType', width: 20 },
            // ... Add other columns as required
        ];

        // Add rows from the events data
        for (let event of events) {
            worksheet.addRow(event);
        }

        // Create a buffer and return
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }
};

module.exports = reportService;
