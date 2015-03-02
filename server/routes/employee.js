'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

var Employee = require('../models/Employee');

router.get('/employee', cors(), function(req, res) {
  Employee.find({}, function(err, result) {
    if(err){
      res.status(400).send('There was a problem fetching all of the users');
      return;
    }
    return res.json(result);
  });
});

router.get("/employee/:id", function(req, res) {
   Employee.findById(req.params.id, function(err, employee) {
      if(err) {
        return res.json(err);
      } else {
        return res.json(employee);
      }
    });
});

router.post("/employee", function(req, res) {
  var employee;
  employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number
  });

  employee.save(function(err) {
    if(err) {
      return res.json(err);
    }
  });
  return res.send(employee);
});

router.put("/employee/:id", function(req, res) {
    Employee.findById(req.params.id, function (err, employee) {
      if(err)
         res.json(err);
 
      employee.email = req.body.email;
      employee.phone_number = req.body.phone_number;

      employee.save(function(err) {
        if(err) {
          res.json(err);
        }
      });
      return res.send(employee);
   });
});

router.delete("/employee/:id", function(req, res) {
  return Employee.findById(req.params.id, function(err, employee) {
    return employee.remove(function(err) {
      if(err) {
        res.json(err);
      } else {
        return res.send('deleted ' + req.params.id);
      }
    });
  });
});

module.exports = router;