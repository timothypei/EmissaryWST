'use strict';

/* This module is meant to house all of the API 
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});
var mongoose = require('mongoose');
var form = require('../../models/form/FormTemplate');


/********** FORM TEMPLATE ROUTES **********/
router.get('/form/template/:id', function(req, res) {
  mongoose.model('FormTemplate').findOne({'_id' : req.params.id}, function(err, template) {
    if(err)
      res.json({error: "There was an error finding the template form."});
    else
      res.send(template);
  });
});


router.get('/form/template/company/:id', function(req, res) {
  mongoose.model('FormTemplate').findOne({'_admin_id' : req.params.id}, function(err, template) {
    if(err)
      res.json({error: "There was an error finding the template form."});
    else
      res.send(template);
  });
});


router.post('/form/template', function(req, res) {
  var newTemplate = new form();
  newTemplate._admin_id = req.body._admin_id;
  newTemplate.template = req.body.template;

  newTemplate.save(function(err, template) {
    if(err)
      //res.json({error: "There was an error inserting a new template."});
       res.json(err);
    else
      res.json(template);
  });
});




/********** PATIENT FORM ROUTES **********/

router.get('/form/patient/:form_id', function(req, res) {

});








module.exports = router;
