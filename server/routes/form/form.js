'use strict';

/* This module is meant to house all of the API
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});
var SubmittedForm = require('../../models/form/SubmittedForm');
var mongoose = require('mongoose');
var templateForm = require('../../models/form/FormTemplate');

/********** FORM TEMPLATE ROUTES **********/
router.get('/form/template/:id', function(req, res) {
  templateForm.findOne({'_id' : req.params.id}, function(err, template) {
    if(err)
      res.json({error: "There was an error finding the template form."});
    else
      res.send(template);
  });
});


router.get('/form/template/company/:id', function(req, res) {
  templateForm.findOne({'_admin_id' : req.params.id}, function(err, template) {
    if(err)
      res.json({error: "There was an error finding the template form."});
    else
      res.send(template);
  });
});

router.post('/form/template', function(req, res) {
  var newTemplate = new templateForm();
  newTemplate._admin_id = new mongoose.Types.ObjectId(req.body._admin_id);
  newTemplate.template = req.body.template;

  newTemplate.save(function(err, template) {
    if(err)
        res.json(err)
      //res.json({error: "There was an error inserting a new template."});
    else
      res.json(template);
  });
});

/* accept DELETE request at /form/template/:template_id */
router.delete('/form/template/:template_id', urlparser, function (req, res) {
    /* Get id param from request */
    var templateID = req.params.template_id;

    if(!templateID) {
      res.status(400).send('need a template id');
      return;
    }

    templateForm.findOneAndRemove({_id: templateID}, function(err, result) {
      if(err) {
        res.status(500).send('There was problem removing the form template');
        return;
      }
      res.send('removed form template: ' + JSON.stringify(result));
    });
});

/* Accept PUT request at /form/template */
router.put('/form/template', function(req, res) {
    var update = {template: req.body.template};
    var options = {new: true};

    templateForm.findOneAndUpdate({_id: req.body.template_id}, update, options,
      function(err, template) {
          if(err)
            res.json({error: "There was an error updating a template."});
          else
            res.json(template);
      });
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
