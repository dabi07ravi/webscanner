const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(emailConfig);

const emailService = {
    /**
     * Sends an email.
     * @param {string} recipient - The email recipient.
     * @param {string} subject - The email subject.
     * @param {string} message - The email message (can be HTML).
     * @returns {Promise} - A promise that resolves when the email is sent.
     */
    async sendEmail(recipient, subject, message) {
        const mailOptions = {
            from: emailConfig.auth.user, // sender address
            to: "raghav.dabi.7@gmail.com",               // list of receivers
            subject: "Event Data",            // subject line
            html: "check the excel sheet"                // HTML body content
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            return `Email sent: ${info.response}`;
        } catch (error) {
            throw new Error(`Error sending email: ${error.message}`);
        }
    }
};

module.exports = emailService;
