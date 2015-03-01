/**
 * Created by xxvii27 on 2/27/15.
 */

//Import Resources and Libs
var express = require('express');
var router = express.Router();
var cors = require('cors');
var Patient = require('../models/Patient');
var io = require('socket.io');//Socket IO

//Routes

//Patient Checked In to the Queue
router.post("/:user_id/patient", function(req, res) {

    var patient = new Patient({
        user_id: req.params.user_id,
        name: req.body.name,
        doctor: req.body.doctor
    });

    patient.save(function(err){
        if(err)
            return res.json(err);
    });

    return res.send(patient);
});

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









module.exports = router;
