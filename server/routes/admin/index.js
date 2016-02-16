/**
 * Created by kevingu on 2/12/16.
 */
'use strict';

var express = require('express');
var controller = require('./admin.controller');

var router = express.Router();

router.post('/signup', 			controller.template.signup);
router.post('/login', 			controller.template.login);
router.put('/getCompanies',     controller.template.getCompanies);

module.exports = router;/**
 * Created by kevingu on 2/15/16.
 */
