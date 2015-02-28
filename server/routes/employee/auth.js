'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to authentication of employees
 */
var express = require('express');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

router.post('/signup', signupEmployee);
router.post('/login', loginEmployee);

var Employee = require('../../models/Employee');
var jwt = require('jwt-simple');

function signupEmployee(req, res) {
  //Put them into the database
  var b = req.body;
  if(!b.name || !b.email || !b.password)
    return res.status(400).json({error: "Please provide employee's name, email, and password"})

  var employee = new Employee();
  employee.name = req.body.name;
  employee.email = req.body.email;
  employee.phone_number = req.body.phone_number
  employee.password = employee.generateHash(req.body.password);
  employee.token = jwt.encode(req.body.email, employee.generateHash(new Date().getTime()));
  // save the user
  employee.save(function(err) {
    if(err)
      return res.status(400).send(err);
    return res.sendStatus(200);
  });
};

function loginEmployee(req, res) {
  //Give them a token
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  Employee.findOne({email: req.body.email}, function(err, user) {
    // if there are any errors, return the error before anything else
    if(err || !user)
      return res.status(400).send(err);


    // if the user is found but the password is wrong
    if(!user.validPassword(req.body.password))
      return res.status(401).send('loginMessage', 'Oops! Wrong password');

    var newToken = jwt.encode(req.body.email, user.generateHash(new Date().getTime()));
    user.token = newToken;
    user.save(function(err) {
      if(err)
        return res.status(400);
      return res.json({token: newToken});
    });

  });
};

module.exports = router;