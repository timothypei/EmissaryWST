var winston = require('winston');
var expressWinston = require('express-winston');
winston.emitErrs = true;

var toLog = new expressWinston.logger({
    transports: [
        new winston.transports.File({
            level: 'info',
	    name: 'info-file',
            filename: __dirname + '/logs/serverinfo.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 10,
            colorize: true
        })

    ],
    exitOnError: false
});

var errLog = new expressWinston.errorLogger({
    transports: [
        new winston.transports.File({
            level: 'error',
	    name: 'error-file',
            handleExceptions: true,
            filename: __dirname + '/logs/servererror.log',
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: true
        })

    ],
    exitOnError: false
});


module.exports = toLog;



