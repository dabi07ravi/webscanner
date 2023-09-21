const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', // Log only if info.level less than or equal to this level
    format: winston.format.json(),
    defaultMeta: { service: 'event-tracker' }, // Default meta-data to be added to each log
    transports: [
        // Write all logs with level `error` and below to `error.log`
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        // Write all logs with level `info` and below to `combined.log`
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// If we're not in production, also log to the `console` with the format: `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;



// const logger = require('./utils/logger');

// // Example usage:
// logger.info('This is an information message.');
// logger.warn('This is a warning message.');
// logger.error('This is an error message.');
