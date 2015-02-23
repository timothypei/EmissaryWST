'use strict';

/* Require mongoose to interact with mongoDB */
var mongoose = require('mongoose');

/*
 * Employee schema
 */
var employeeSchema = mongoose.Schema({
  name: String,
  email: String,
  phone_number: String
});


module.exports = mongoose.model('employee', employeeSchema);
