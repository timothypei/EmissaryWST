'use strict';

var express = require('express');
var controller = require('./employee.controller');

var router = express.Router();

var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});

router.get('/employee', controller.getAllEmployees);
router.get('/employee/:id', controller.getById);
router.put("/employee/:id", controller.update);
router.delete("/employee/:id", controller.delete);

module.exports = router;