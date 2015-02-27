/**
 * Created by xxvii27 on 2/27/15.
 */
'use strict';

//monggose set up
var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

//Schema for user Patient settings
var PatientSchema   = new Schema({
    user_id: String,//Company/Hospital ID
    name: String,
    doctor: String,//Doctor to see
    time: { type : Date, default: Date.now }
});

//Export schema
module.exports = mongoose.model('Patient', PatientSchema);
