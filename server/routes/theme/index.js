'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */
var express = require('express');
var router = express.Router();
var controller = require('./theme.controller');

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

var Theme = require('../../models/Theme');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Intializing.....');
    next();
});


//For client access
router.route('/:user_id/theme');

//post with default values
router.post('/', controller.template.create);

//get the theme correspond to the user
router.get('/', controller.template.get);


//Edit, when the user save new settings
router.put('/', controller.template.update);


//Delete, when a user unsuscribed from the service
router.delete('/', controller.template.delete);

module.exports = router;
