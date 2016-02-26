
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Appointment = require('./Appointment');

var visitorSchema  = new Schema({
    company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    name: { type: String},
    phone_number: { type: String },
    checkin_time: { type : Date, default: Date.now},
    appointments: {type: [Appointment]},
    additional_info: {}
});

module.exports = mongoose.model('visitor', visitorSchema );