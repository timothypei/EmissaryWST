'use strict';

/* This module is meant to house all of the API
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});
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

//{"__v":0,"template":"{name=blah}","_admin_id":"54cade4a4c355cbb1a6b5404","_id":"54eba721e488a47731ce6005"}
router.post('/form/template', function(req, res) {
  var newTemplate = new templateForm();
  newTemplate._admin_id = new mongoose.Types.ObjectId(req.body._admin_id);
  newTemplate.template = req.body.template;

  console.log(req.body);
  console.log(newTemplate._admin_id);
  console.log(newTemplate.template);

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
router.get('/form/patient/:form_id', function(req, res) {

});








module.exports = router;
