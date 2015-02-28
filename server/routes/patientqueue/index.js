'use strict';

var express = require('express');
var controller = require('./patientqueue.controller');

var router = express.Router();

var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});

router.post("/api/patient/checkin", controller.checkin);
/*router.get('/template/company/:id', controller.template.findByCompanyId);
router.post('/template', controller.template.create);
router.put('/template', controller.template.update)
router.delete('/template/:template_id', controller.template.delete);
*/
module.exports = router;