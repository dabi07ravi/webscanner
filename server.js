const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json()); // for parsing application/json

const PORT = 3000;

const emailConfig = {
    service: 'gmail', // or another email service
    auth: {
        user: 'yourEmail@gmail.com', // your email
        pass: 'yourPassword' // your email password
    }
};

const transporter = nodemailer.createTransport(emailConfig);

app.post('/send-notification', (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).send('Required fields are missing');
    }

    const mailOptions = {
        from: emailConfig.auth.user,
        to: email,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(PORT, () => {
    console.log(`Notification service is running on http://localhost:${PORT}`);
});
