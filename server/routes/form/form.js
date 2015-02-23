'use strict';

/* This module is meant to house all of the API
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});
var SubmittedForm = require('../../models/form/SubmittedForm');


/********** FORM TEMPLATE ROUTES **********/

router.get('/form/template/:id', function(req, res) {

});





/********** PATIENT FORM ROUTES **********/


var getSubmittedFormById = function(req, res) {
  SubmittedForm.findOne({ '_id': req.params.form_id }, function (err, submittedForm) {
    if (err) {
      res.json({error: "An error occured while finding patient form"});
      return;
    }
    res.json(submittedForm)
  });
};

var postSubmittedForm = function(req, res) {
  var form = new SubmittedForm();
  form.form = req.body.form;
  form._admin_id = req.body._admin_id;
  form.firstName = req.body.firstName;
  form.lastName = req.body.lastName;
  form.email = req.body.email;
  form.date = new Date();
  form.save(function(err, savedForm){
    if (err){
      res.json({error: "An error occured while saving the submitted form"})
      return;
    }
    res.json(savedForm);
  });
}

var getSubmittedFormByPatientInfo = function(req, res) {
  var query = {},
    firstName = req.query.firstName,
    lastName = req.query.lastName,
    email = req.query.email;

  if(!((firstName && lastName) || email)) {
    res.json({error: "You must specify either both first and last name or email"});
    return;
  }
  firstName ? query.firstName = firstName : null;
  lastName ? query.lastName = lastName : null;
  email ? query.email = email : null;

  if(req.query.mostRecent == "true") {
    SubmittedForm.findOne(query).sort('-date').exec(function (err, submittedForm) {
      if (err) {
        res.json({error: "An error occured while finding patient form"});
        return;
      }
      res.json(submittedForm);
    });
  }
  else {
    SubmittedForm.find(query, function(err, submittedForms) {
      if (err) {
        res.json({error: "An error occured while finding patient forms"});
        return;
      }
      res.json(submittedForms);
    });
  }



};

router.get('/form/patient/:form_id', getSubmittedFormById);
router.get('/form/patient', getSubmittedFormByPatientInfo)
router.post('/form/patient', postSubmittedForm);







module.exports = router;
