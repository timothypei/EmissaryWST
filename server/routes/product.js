'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

var Product = require('../models/Product');

router.get('/products', cors(), function(req, res) {
  Product.find({}, function(err, result) {
    if(err){
      res.status(400).send('There was a problem fetching all of the users');
      return;
    }
    res.json(result);
  });
});

module.exports = router;