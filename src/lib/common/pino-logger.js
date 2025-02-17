const pinoLogger = require('pino')
const logger = pinoLogger({
    level: process.env.PINO_LOG_LEVEL || 'debug',
    timestamp: pinoLogger.stdTimeFunctions.isoTime,
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        },
    },
});

module.exports = { logger }