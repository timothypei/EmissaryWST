/**
 * Created by kevingu on 2/12/16.
 */
'use strict';

var express = require('express');
var controller = require('./company.controller');

var router = express.Router();

router.post('/signup', 			controller.template.signup);
router.post('/login', 			controller.template.login);
router.put('/updatePaidtime/:id',   controller.template.updatePaidTime);
router.put("/setting/:user", 	controller.template.resetCredentials);

module.exports = router;