'use strict';

/* Require mongoose to interact with mongoDB */
var mongoose = require('mongoose');

/*
 * Employee schema
 */
var employeeSchema = mongoose.Schema({
  name: String,
  email: String,
  phone_number: String,
   _admin_id: { type: Schema.Types.ObjectId, ref: 'AdminUser', required: true }
});


module.exports = mongoose.model('employee', employeeSchema);
