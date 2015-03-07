'use strict';

var express = require('express');
var server;
var io = require('socket.io')();
var port = process.env.PORT || 3000;
var exports = module.exports;

/********** Socket IO Module **********/
exports.createServer = function(app) {
    server = require('http').createServer(app);
    io = require('socket.io').listen(server);

    // /* Initialize the server */
    server.listen(app.get('port'), function () {
      console.log('Server listening at port %d', port);
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
    io.to(adminID).emit('queue_updated', queue);
};

/*
 * A function that allows you to notify all clients that
 * a patient has been added to the queue.
 */
exports.notifyPatientAdded = function(adminID, patient) {
    io.to(adminID).emit('patient_added', patient);
};

/*
 * A function that allows you to notify all clients that
 * a patient has been removed from the queue.
 */
exports.notifyPatientRemoved = function(adminID, patient) {
    io.to(adminID).emit('patient_removed', patient);
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

/*
 * This handles the 'connection' event, which is send when the user is
 * trying to connect a socket.
 *
 * Note that when the connection is established for that client,
 * the '_admin_id' needs to be set so that the client can be added to the
 * room and notified when changes are being made.
 */
io.on('connection', function (socket) {
    // Get the ID of the admin that has connected.
    var adminID;

    socket.get('_admin_id', function (err, _admin_id) {
        socket.join(_admin_id);
    });

    console.log(adminID);
});
