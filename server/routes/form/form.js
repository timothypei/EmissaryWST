'use strict';

/* This module is meant to house all of the API 
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});
var mongoose = require('mongoose');



/********** FORM TEMPLATE ROUTES **********/
router.get('/form/template/:id', function(req, res) {
  mongoose.model('FormTemplate').findById(req.params.id, function(err, template) {
    if(err)
      res.json(err);

    res.send(template);
  });
});

router.get('/form/template/company/:id', function(req, res) {
  mongoose.model('FormTemplate').findById(req.params._admin_id, function(err, template) {
    if(err)
      res.json(err);

    res.send(template);
  });
});





/********** PATIENT FORM ROUTES **********/

router.get('/form/patient/:form_id', function(req, res) {

});








module.exports = router;
