/**
 * Created by xxvii27 on 2/27/15.
 */
'use strict';

//monggose set up
var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

//Schema for Patient in the queue
var PatientSchema   = new Schema({
    _admin_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },//Company/Hospital ID
    name: String,
    _doctor_id: { type: Schema.Types.ObjectId, ref: 'Employee', required: false },//Doctor to see
    checkin_time: { type : Date, default: Date.now },
});

//Export schema
module.exports = mongoose.model('Patient', PatientSchema);
