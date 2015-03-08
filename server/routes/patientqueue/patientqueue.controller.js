/**
 * Created by xxvii27 and DylanMoz(Dylan Mozlowski) on 2/27/15.
 */

//Import Resources and Libs
var express = require('express');
var router = express.Router();

var Email = require('../../notification/email');
var TextModel = require('../../notification/text');
var Socket = require('../../socket/socket');

var PatientQueue = require('../../models/PatientQueue');
var Employee = require('../../models/Employee');

// This route will be called when the patient checks in
exports.checkin = function(req, res) {
    if(!(req.body._admin_id && req.body.name))
        return res.status(400).json({error: "Please send _admin_id and name."});
    var patient = {
        _admin_id: req.body._admin_id,
        name: req.body.name,
        _doctor_id: req.body._doctor_id,
        checkin_time: new Date()
    };

    var queue = {
        _admin_id: req.body._admin_id,
        $push: {"patients": patient}
    };
    PatientQueue.findOneAndUpdate(
        {_admin_id: req.body._admin_id},
        queue,
        {safe: true, upsert: true}, 
        function(err, queue) {
            if(err)
                res.status(400).json({error: "an error occured while checking in"});
            
            Employee.find({_admin_id : req.body._admin_id}, 
                function(err, employees) {
                    var i = 0;
                    var respond = function() {
                        i++;
                        if(i == 2) {
                            res.json({queue: queue});
                        }
                    };

                    Email.sendEmail(employees, function(){respond();});
                    TextModel.sendText(employees, function(){respond();});
                }
            );

            // New queue is sent to the socket
            Socket.notifyNewQueue(req.body._admin_id, queue);
        }
    );
};
/*
//Get all Patients in the hospital
router.get('/:user_id/patient', function(req, res){
    Patient.find({}, function(err, result) {
        if(err){
            res.status(400).send('There was a problem fetching patients');
            return;
        }
        return res.json(result);
    });
});

//Get patients from Doctor
router.get('/:user_id/patient/:doctor_name', function(req, res){
    Patient.find({doctor: req.params.doctor_name}, function(err, patient) {
        if(err) {
            return res.json(err);
        } else {
            return res.json(patient);
        }
    });
});

//Get patient from ID
router.get('/:user_id/patient/:patient_id', function(req, res){
    Patient.findById(req.params.patient_id, function(err, patient) {
        if(err) {
            return res.json(err);
        } else {
            return res.json(patient);
        }
    });
});

//Remove Patient from the Queue
//By ID
router.delete("/:user_id/patient/:patient_id", function(req, res) {
    return Patient.findById(req.params.patient_id, function(err, patient) {
        return patient.remove(function(err) {
            if(err) {
                res.json(err);
            } else {
                return res.send('deleted ' + req.params.patient_id);
            }
        });
    });
});



*/