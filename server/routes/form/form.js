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
<<<<<<< HEAD
=======
<<<<<<< HEAD


router.get('/form/template/company/:id', function(req, res) {
  templateForm.findOne({'_admin_id' : req.params.id}, function(err, template) {
    if(err)
      res.json({error: "There was an error finding the template form."});
    else
      res.send(template);
=======
>>>>>>> 2c01393363310e293af9366c47bc1dc51e8d6651


router.get('/form/template/company/:id', function(req, res) {
  templateForm.findOne({'_admin_id' : req.params.id}, function(err, template) {
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
      res.json({error: "There was an error inserting a new template."});
    else
      res.json(template);
<<<<<<< HEAD
=======
>>>>>>> 39c9dc3855a7ab6ace95b7509485e62936ccdc8f
  });
});


router.post('/form/template', function(req, res) {
  var newTemplate = new form();
  newTemplate._admin_id = req.body._admin_id;
  newTemplate.template = req.body.template;

  newTemplate.save(function(err, template) {
    if(err)
      res.json({error: "There was an error inserting a new template."});
    else
      res.json(template);
>>>>>>> 2c01393363310e293af9366c47bc1dc51e8d6651
  });
});

/* accept DELETE request at /form/template/:template_id */
router.delete('/form/template/:template_id', urlparser, function (req, res) {
    /* Get id param from request */
    var templateID = req.params.id;

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
})



/********** PATIENT FORM ROUTES **********/

router.get('/form/patient/:form_id', function(req, res) {

});








module.exports = router;
