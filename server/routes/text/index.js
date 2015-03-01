'use strict';

var express = require('express');
var controller = require('./text.controller');

var router = express.Router();

var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});

router.post('/sendText', controller.template.sendText);

module.exports = router;
