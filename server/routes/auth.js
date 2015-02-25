'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to authentication of admins
 */
var express = require('express');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

var Authmodel = require('../models/Authmodel');
var jwt = require('jwt-simple');

router.post('/signup', function(req,res){
  //Put them into the database
  var admin = new Authmodel();
  admin.local.email = req.body.email;
  admin.local.password = admin.generateHash(req.body.password);
    // save the user
    admin.save(function(err) {
        if (err)
            throw err;
      //  return done(null, admin);
    });
    return res.sendStatus(200);
});

router.post('/login', function(req,res){
  //Give them a token

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    Authmodel.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, return the message
        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

      var newToken = jwt.encode(req.body.email, User.generateHash(req.body.password));
      user.update({token: newToken});
      // encode
  
    return res.send(newToken);
  });
});



module.exports = router;