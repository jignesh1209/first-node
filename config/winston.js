var appRoot = require('app-root-path');
var winston = require('winston');
require('winston-daily-rotate-file');

var options = {
    error: {
        level: 'error',
        name: 'file.error',
        filename: `${appRoot}/logs/error/%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        timestamp: true,
        handleExceptions : true,
        json: true,
        maxsize: '1k',
        maxFiles: '2',
        colorize: true
    }
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile(options.error)
    ],
    exitOnError: false
});

module.exports = logger;