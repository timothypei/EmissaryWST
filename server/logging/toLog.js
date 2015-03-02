var winston = require('winston');
winston.emitErrs = true;

var toLog = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/serverinfo.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 10,
            colorize: false
        }),
        new winston.transports.File({
            level: 'debug',
            filename: './logs/serverdebug.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/servererror.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = toLog;
module.exports.stream = {
    write: function(message, encoding){
        toLog.info(message);
    }
};
