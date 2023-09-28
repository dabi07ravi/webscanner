const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { getCurrentDate } = require("../utils/date.utils");

const transporter = nodemailer.createTransport(emailConfig);

const emailService = {

    /**
    * Sends an email.
    * @param {string} recipient - The email recipient.
    * @param {string} subject - The email subject.
    * @param {string} message - The email message (can be HTML).
    * @returns {Promise} - A promise that resolves when the email is sent.
    */
    async sendEmail(recipient) {
        const currentDate = getCurrentDate();
        const subject = "Freshly Harvested: Data Snapshot Up to " + currentDate;
        const emailTemplatePath = path.join(__dirname, '..', 'views', 'emailTemplate.ejs');
        const reportfileName = `report_${currentDate}.xlsx`;
        const reportPath = path.join(__dirname, '..', 'reports', reportfileName);
        const html = await ejs.renderFile(emailTemplatePath, { recipientName : "pradhyuman" });


        const attachments = [{
            filename: reportfileName,
            path: reportPath, // or a stream or a URL
        }];


        const mailOptions = {
            from: emailConfig.auth.user, // sender address
            to: recipient || "pradhyuman@arcgate.com",               // list of receivers
            subject: subject,  // subject line
            html: html,               // HTML body content
            attachments: attachments
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
