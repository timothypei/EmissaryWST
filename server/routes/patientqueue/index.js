'use strict';

var express = require('express');
var controller = require('./patientqueue.controller');

var router = express.Router();

var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});

router.post("/checkin", controller.checkin);
router.get("/getPatients/:auth_id", controller.getPatientQueue);
router.post("/delete", controller.deletePatient);

module.exports = router;