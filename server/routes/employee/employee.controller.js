'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
var exports = module.exports;

var Employee = require('../../models/Employee');

exports.login = function(req, res) {
    Employee.findOne({email:req.body.email}, function(err, e) {
        if(err || !e){
          return res.status(400).send({error: "Can not Find"});
        }
        if(!e.validPassword(req.body.password))
          return res.status(400).send({error: "Incorrect Credentials"});
        return res.status(200).json(e);
    });
};

exports.getAllEmployees = function(req, res) {
  Employee.find({company_id : req.params.id}, function(err, result) {
    if(err){
      return res.status(400).send({error: "Can not Find"});
    }
    return res.status(200).json(result);
  });
};

exports.getById = function(req, res) {
   Employee.findById(req.params.id, function(err, employee) {
      if(err) {
        return res.status(400).json({error: "Can not Find"});
      } else {
        return res.status(200).json(employee);
      }
    });
};

exports.insert = function(req, res) {
    var employee = new Employee();
    employee.name = req.body.name;
    employee.email = req.body.email,
    employee.phone_number  = req.body.phone_number,
    employee.company_id = req.body.company_id,
    employee.password = employee.generateHash(req.body.password),
    employee.role =  req.body.role

    employee.save(function(err, e) {
    if(err) {
      return res.status(400).json({error: "Can not Save"});
    }
    return res.status(200).send(e);
  });
};

exports.update = function(req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if(err)
            return res.status(400).json({error: "Can not Update"});
 
        employee.name = req.body.name || employee.name;
        employee.email = req.body.email || employee.email;
        employee.phone_number = req.body.phone_number || employee.phone_number;
        employee.password = req.body.password || employee.password;
        employee.role = req.body.role || employee.role;

        employee.save(function(err) {
        if(err)
          return res.status(400).json({error: "Can not Save"});
        return res.status(200).send(employee);
      });
   });
};

exports.delete = function(req, res) {
  Employee.findById(req.params.id, function(err, employee) {
    return employee.remove(function(err) {
      if(err) {
        res.status(400).json({error: "Can not Find"});
      } else {
        return res.status(200).send(employee);
      }
    });
  });
};
