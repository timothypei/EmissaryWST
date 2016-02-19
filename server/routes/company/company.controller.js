'use strict';

/*This module is meant to house the functions
 * used by the authorization (auth) API. The
 * actual API is set up in index.js

 Functions:
 authSignup()
 authLogin()
 authResetCredentials()
 */


var express = require('express');
var config = require('../../config/config');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var Company = require('../../models/Company');
var jwt = require('jwt-simple');

/****** Company TEMPLATE ROUTES ******/
module.exports.template = {};

/**signup- Used to sign up a user.*/
module.exports.template.signup = function(req, res) {
    var company = new Company();

    //require provided info
    company.email = req.body.email;
    company.password = company.generateHash(req.body.password);
    company.name = req.body.name;
    company.phone_number = req.body.phone_number;
    company.expiration_date=req.body.expiration_date;
    company.credit_card_number=req.body.credit_card_number;

    company.token = jwt.encode(req.body.email, config.secret);
    company.paid_time=new Date();

    company.save(function(err, c) {
        if(err)
            return res.status(400).send(err);
        return res.status(200).json(
            {
                token: c.token,
                admin_id: c._id,
                name: c.name,
                email: c.email,
                phone_number: c.phone_number,
                paid_time:c.paid_time
            });
    });
};

/**authLogin- logs in a user*/
module.exports.template.login = function(req, res) {
    //Give them a token
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    Company.findOne({email: req.body.email}, function(err, company) {
        // if there are any errors, return the error before anything else
        if(err || !company)
            return res.status(400).send(err);
        // if the user is found but the password is wrong
        if(!company.validPassword(req.body.password))
            return res.status(401).send('loginMessage', 'Oops! Wrong password');
        var newToken = jwt.encode(req.body.email, config.secret);
        company.token = newToken;
        company.save(function(err, c) {
            if(err)
                return res.status(400).json(err);
            return res.status(200).json(
                {
                    token: newToken,
                    id: c._id,
                    name: c.name,
                    email: c.email,
                    phone_number: c.phone_number,
                    paid_time: c.paid_time
                });
        });
    });
};

module.exports.template.updatePaidTime = function(req, res){
    var currTime=new Date();
    var query = { _id: req.params.id };
    var update = { paid_time: currTime };
    var options = { multi: false };
    Company.update(query, update, options, function(err){
        if(err) return res.status(401).json(err);
        var jsonRes = { paid_time: currTime };
        return res.status(200).json(jsonRes);
    });
};

/**authResetCredentials- resets a user's credentials*/
module.exports.template.resetCredentials = function(req, res) {
    Company.findOne({email: req.params.user}, function (err, c) {
        if(err || !c)
            return res.status(401).json(err);


        // if the user is found but the password is wrong
        if(!c.validPassword(req.body.password))
            return res.status(401).send('loginMessage', 'Oops! Wrong password');
        //update password

        //upadate password
        if (req.body.newpassword !== undefined)
            c.password = c.generateHash(req.body.newpassword);

        //update email
        if (req.body.newemail !== undefined)
            c.email = req.body.newemail;

        //update company name
        if (req.body.new_company_name !== undefined)
            c.company_name = req.body.new_company_name;

        //update company's phone number
        if (req.body.new_company_phone_number !== undefined)
            c.company_phone_number = req.body.new_company_phone_number;

        c.save(function(err) {
            if(err) {
                res.status(400).send(err);
            }
        });
        return res.status(200).json(c);
    });
};
