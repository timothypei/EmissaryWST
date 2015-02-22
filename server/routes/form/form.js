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

/* accept DELETE request at /form/template/:template_id
 * {
 * error: [string],
 * template_id : [integer],
 * company_id : [integer],
 * template : [object]
 * }
 */
router.delete('/form/template/:template_id', urlparser, function (req, res) {
    /* Get id param from request */
    var templateID = req.params.id;

    if(!templateID) {
      res.status(400).send('need a template id');
      return;
    }

    FormTemplate.findOneAndRemove({_id: templateID}, function(err, result) {
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
