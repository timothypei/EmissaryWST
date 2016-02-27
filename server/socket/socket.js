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
var REMOVE_VISITOR = 'remove_visitor';
var ADD_VISITOR = 'add_visitor';


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
            Company.findOne({_id: companyId}, function(err, c){
                if(err || !c)
                    throw(err);
                else {
                    socket.join(companyId);
                    VisitorList.findOne({company_id:companyId}, function(err,list){
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
                    });
                }
            });
        });

        //requires the company_id to be sent
        socket.on(REQUEST_VISITOR_LIST, function(data) {
            var company_id = data.company_id;
            VisitorList.getCompanyVisitorList(company_id, function(err_msg, result){
                if(err_msg)
                    throw(new Error(err_msg));
                else
                    exports.notifyNewQueue(company_id, result);
            });
        });

        socket.on(DISCONNECT, function() {
            console.log('user disconnected from ' + companyId);
        });

        //requires the company_id and visitor_id to be sent
        socket.on(REMOVE_VISITOR, function(data) {
            if(!data.company_id || ! data.visitor_id) return;
            VisitorList.deleteVisitor(company_id, function(err_msg, result){
                if(err_msg)
                    throw(new Error(err_msg));
                else
                    exports.notifyNewQueue(company_id, result);
            });
        });

        //require the params to be set with info of the visitor
        socket.on(ADD_VISITOR, function(data) {
            VisitorList.create(data.params, function(err_msg, result){
                if(err_msg)
                    throw(new Error(err_msg));
                else
                    exports.notifyNewQueue(company_id, result);
            });
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
    io.to(adminID).emit(REQUEST_VISITOR_LIST, queue);
};

/*
 * A function that allows you to notify all clients that
 * a patient has been added to the queue.
 */
exports.notifyPatientAdded = function(adminID, patient) {
    io.to(adminID).emit(ADD_VISITOR, patient);
};

/*
 * A function that allows you to notify all clients that
 * a patient has been removed from the queue.
 */
exports.notifyPatientRemoved = function(adminID, patient) {
    io.to(adminID).emit(REMOVE_VISITOR, patient);
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