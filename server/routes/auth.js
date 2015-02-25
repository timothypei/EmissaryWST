'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to authentication of admins
 */
var express = require('express');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

var Authmodel = require('../models/Authmodel');

router.post('/auth/signup', function(req,res){
  //Put them into the database
});

router.post('/auth/login', function(req,res){
  //Give them a token
});



module.exports = router;