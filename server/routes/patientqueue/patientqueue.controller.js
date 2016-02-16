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

exports.getPatientQueue = function(req, res){
    var auth_id=req.params.auth_id;
    if(!auth_id)
        return res.status(400).json({error: "Please send admin id."});
    PatientQueue.findOne({_admin_id: auth_id}, function(err, queue){
        if(err) return res.status(400).json({error: "getting queue"});
        return res.status(200).json(queue.patients);
    });
}

exports.deletePatient = function(req, res){
    var patientId=req.body.patientId;
    var authId=req.body.authId;
    if(!authId)
        return res.status(400).json({error: "Please send admin id."});
    if(!patientId)
        return res.status(400).json({error: "Please send patient id."});
    PatientQueue.findOneAndUpdate({_admin_id: authId}, {$pull: {patients:{_id:patientId}}}, {safe: true, upsert: true, new:true}, function(err, data){
        if(err) return res.status(400).json({error: err});
        return res.status(200).json(data.patients);
    });
}
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
        {safe: true, upsert: true, new:true},
        function(err, queue) {
            if(err)
                res.status(400).json({error: "an error occured while checking in"});
            
            Employee.find({_admin_id : req.body._admin_id}, 
                function(err, employees) {
                    var i = 0;
                    var respond = function() {
                        i++;
                        if(i == 2) {
                            res.status(200).json({queue: queue});
                        }
                    };

                    Email.sendEmail(req.body.name, employees, function(){respond();});
                    TextModel.sendText(req.body.name, employees, function(){respond();});
                }
            );

            // New queue is sent to the socket
            //Socket.notifyNewQueue(req.body._admin_id, queue);
        }
    );
};