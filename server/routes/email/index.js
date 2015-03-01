'use strict';

var express = require('express');
var controller = require('./email.controller');

var router = express.Router();

var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});

router.post('/sendEmail', controller.template.sendEmail);

module.exports = router;
