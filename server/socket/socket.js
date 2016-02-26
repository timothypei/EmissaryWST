'use strict';

var express = require('express');
var server;
var io = require('socket.io')();
var exports = module.exports;

//Constants for listening to Sockets
var CONNECTION = 'connection';
var VALIDATE_COMPANY_ID = 'validate_company_id';
var REQUEST_COMPANY_ID = 'request_id';
var REQUEST_VISITOR_LIST = 'request_visitor_list';
var DISCONNECT = 'disconnect';


//TODO: Fix this
var VisitorList = require('../models/visitorList');

/********** Socket IO Module **********/
exports.createServer = function(io_in) {
    io = io_in;

    /*
     * This handles the 'connection' event, which is send when the user is
     * trying to connect a socket.
     *
     * Note that when the connection is established for that client,
     * the '_admin_id' needs to be set so that the client can be added to the
     * room and notified when changes are being made.
     */
    io.on(CONNECTION, function (socket) {
        // Get the ID of the company that has connected.
        var companyId;

        socket.emit(REQUEST_COMPANY_ID);
        socket.on(VALIDATE_COMPANY_ID, function(data) {
            companyId = data.company_id;
            VisitorList.findOne({company_id: companyId}, function(err, list){
                if(err)
                    throw(err);
                else {
                    socket.join(companyId);
                    if(list == null){
                        list = new VisitorList();
                        list.visitors = [];
                        list.company_id=companyId;
                        list.save(function(err){
                            exports.notifyNewQueue(companyId, q);
                        });
                    }else {
                        exports.notifyNewQueue(companyId, q);
                    }
                }
            });
        });

        //requires the company_id to be sent
        socket.on(REQUEST_VISITOR_LIST, function(data) {
            PatientQueue.findOne({company_id : data.company_id}, function(err, q){
                if(err)
                    throw(err);
                else
                    exports.notifyNewQueue(adminID, q ? q : []);
            });
        });

        socket.on(DISCONNECT, function() {
            console.log('user disconnected from ' + companyId);
        });

        socket.on('patient_removed', function(data) {
            console.log("adminID: "+data );
            console.log("patientId: "+data.patientId);
            if(adminID == null) socket.emit('request_id');
            if(!data.patientId) return;
            //TODO actually delete Patient from the queue
            //send ID of visitorList to delete
            io.to(adminID).emit('queue_updated', data.queue);
        });

        socket.on('patient_added', function(patient) {
            if(adminID == null) socket.emit('request_id');
            //TODO actually delete Patient from the queue
            //send ID of visitorList to delete
            io.to(adminID).emit('queue_updated', patient);
        });

    });
    return server;
};
/*
 * A function that allows you to notify all clients that
 * the queue has been updated.
 *
 * The client side needs to be listening for the 'queue_updated' event. When
 * this event is triggered, the client side can retrieve the whole queue of
 * patients to reflect the changes.
 */
exports.notifyNewQueue = function(adminID, queue) {
    io.to(adminID).emit('new_visitor_list', queue);
};

/*
 * A function that allows you to notify all clients that
 * a patient has been added to the queue.
 */
exports.notifyPatientAdded = function(adminID, patient) {
    io.to(adminID).emit('added_new_visitor', patient);
};

/*
 * A function that allows you to notify all clients that
 * a patient has been removed from the queue.
 */
exports.notifyPatientRemoved = function(adminID, patient) {
    io.to(adminID).emit('removed_new_visitor', patient);
};

/*
 * Set up a custom namespace.
 *
 * On the client side get the socket as follows to robobetty:
 *   var socket = io('/patientQueue');
 */
var nsp = io.of('/patientQueue');

// To be used with authorization.
// io.set('authorization', socketioJwt.authorize({
//   secret: jwtSecret,
//   handshake: true
// }));