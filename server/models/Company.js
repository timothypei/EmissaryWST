/**
 * Created by kevingu on 2/12/16.
 */
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var companySchema = mongoose.Schema({
    email: {type: String, unique: true, index: true, required: true},
    token: String,
    name:  {type: String, required: true },
    phone_number: { type: String, required: true },
    credit_card_number: { type: String },//, required:true},
    expiration_date: { type: String },//, required:true},
    paid_time: { type: Date, required: true}
});

// methods ======================


// checking if password is valid
companySchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
// generating a hash
companySchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Company', companySchema);
