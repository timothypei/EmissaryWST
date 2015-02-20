'use strict';

/* This module is meant to house all of the API 
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});



/********** FORM TEMPLATE ROUTES **********/

router.get('/form/template/:id', function(req, res) {

});





/********** PATIENT FORM ROUTES **********/

router.get('/form/patient/:form_id', function(req, res) {

});








module.exports = router;