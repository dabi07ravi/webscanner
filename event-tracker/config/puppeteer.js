// config/puppeteer.js

module.exports = {
    headless: process.env.PUPPETEER_HEADLESS === 'true', // Converts string 'true' or 'false' to boolean
    slowMo: parseInt(process.env.PUPPETEER_SLOWMO, 10) || 0
};
