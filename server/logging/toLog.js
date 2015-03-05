var winston = require('winston');
var expressWinston = require('express-winston');
var path = require('path');
var infofilename = path.join(__dirname , 'serverinfo.log');
var errfilename = path.join(__dirname , 'servererror.log');
winston.emitErrs = true;

var toLog = new expressWinston.logger({
    transports: [
        new winston.transports.File({
            level: 'info',
	    name: 'info-file',
            filename: infofilename,
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 10,
            colorize: false
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
            filename: errfilename,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        })

    ],
    exitOnError: false
});


module.exports = toLog;