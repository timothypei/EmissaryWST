'use strict';

/* This module is strictly meant for one route. This route
 * is responsible for rendering our angular app home page.
 */
var express = require('express');
var path = require('path');
var socket = require('../socket/socket')
var ConfigureAuth = require('./ConfigureAuth');
var Employee = require('../models/Employee');
var router = express.Router();

// Get index.html for socket test
router.get('/socket_client', function(req, res) {
  res.sendFile(path.join(__dirname, '../socket/index.html'));
});

router.get('/sample_client', function(req, res) {
    var patient;

    patient = {
		_admin_id: "noid",
        name: "Tom Brady",
        _doctor_id: "dr. hello",
	}

	console.log("Patient : " + JSON.stringify(patient));
	//socket.notifyNewQueue('testid112', [{first:"1"}, {second:"2"}]);
	socket.notifyPatientAdded('testid112', patient);
	//socket.notifyPatientRemoved('testid112', {removed:"fake patient"});
	res.send("schooled");
});

module.exports = router;