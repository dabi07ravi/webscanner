// config/email.js

module.exports = {
    host: process.env.HOST,
    port: parseInt(process.env.HOST_PORT),
    secure: true,
    auth: {
        user: process.env.HOST_USER,
        pass: process.env.HOST_PASSWORD
    }
};
