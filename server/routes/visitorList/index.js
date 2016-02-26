'use strict';

var express = require('express');
var controller = require('./visitorList.controller');

var router = express.Router();

router.post("/",                           controller.create);
router.get("/company/:id",                 controller.getCompanyVisitorList);
router.delete("/company/:company_id/visitor/:visitor_id", controller.deleteVisitor);
router.delete("/:id",                      controller.delete);

module.exports = router;