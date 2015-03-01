'use strict';

/* Require mongoose to interact with mongoDB */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

/*
 * Employee schema
 */
var employeeSchema = mongoose.Schema({
  name: String,
  email: {type: String, unique: true, index: true, required: true},
  password: String,
  phone_number: String,
   _admin_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: true }
   token: String
});

// checking if password is valid
employeeSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// generating a hash
employeeSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};



module.exports = mongoose.model('employee', employeeSchema);
