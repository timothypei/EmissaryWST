'use strict';

var express = require('express');
var server;
var io = require('socket.io')();
var port = process.env.PORT || 3000;

/********** Socket IO Module **********/
exports.createServer = function(app) {
    server = require('http').createServer(app);
    io = require('socket.io')(server);

    /* Initialize the server */
    server.listen(port, function () {
      console.log('Server listening at port %d', port);
    });

    return server;
}

/*
 * A function that allows you to notify all clients that
 * the queue has been updated.
 */
exports.notifyNewQueue = function(adminID, queue) {
    io.to(adminID).emit('queue_updated', queue);
}

/*
 * A function that allows you to notify all clients that
 * a patient has been added to the queue.
 */
exports.notifyPatientAdded = function(adminID, patient) {
    io.to(adminID).emit('patient_added', patient);
}

/*
 * A function that allows you to notify all clients that
 * a patient has been removed from the queue.
 */
exports.notifyPatientRemoved = function(adminID, patient) {
    io.to(adminID).emit('patient_removed', patient);
}

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

    Console.log(adminID);
});
