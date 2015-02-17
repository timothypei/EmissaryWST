'use strict';

/*
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var path = require('path');
var mongoose = require('mongoose');

/*
 * API keys and Passport configuration.
 */
var config = require('./config/config');

/*
 * Create Express server.
 */
var app = express();

/*
 * Connect to MongoDB.
 */
mongoose.connect(config.mongoUrl);
mongoose.connection.on('connected', function() {
  console.log('MongoDB connected succesfully at: ' + config.mongoUrl);
});

mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please ' +
  'make sure that MongoDB is running.');
});

/*
 * Express configuration.
 */
app.set('port', config.port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'), 
  { maxAge: 31557600000 }));

/*
 * Add in our routes
 */
var home = require('./routes/home');
var user = require('./routes/user');
var product = require('./routes/product');


/*
 * Primary app routes.
 */
app.use(home);
app.use(user);
app.use(product);


/*
 * Error Handler.
 */
app.use(errorHandler());

/*
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', 
    app.get('port'), 
    app.get('env'));
});

module.exports = app;
