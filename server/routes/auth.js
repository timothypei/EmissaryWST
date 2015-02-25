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
  admin.email = req.body.email;
  admin.password = admin.generateHash(req.body.password);
  admin.token = jwt.encode(req.body.email, admin.generateHash(req.body.password + new Date().getTime()));
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
    var admin = new Authmodel();
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    Authmodel.findOne({ email :  req.body.email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err || !user)
            return res.status(400).send(err);


        // if the user is found but the password is wrong
        if (!user.validPassword(req.body.password))
            return res.status(401).send('loginMessage', 'Oops! Wrong password');

      var newToken = jwt.encode(req.body.email, admin.generateHash('req.body.password' + new Date().getTime()));
      user.update({token: newToken});
      // encode
  
    return res.json({token:newToken});
  });
});



module.exports = router;