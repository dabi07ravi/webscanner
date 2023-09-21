// config/email.js

module.exports = {
    service: 'gmail',  // You can change this based on your email service provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
};
