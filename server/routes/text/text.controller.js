'use strict';

var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');

// Load the twilio module
var twilio = require('twilio');

// Twilio Credentials 
var accountSid = 'ACb70bc33c96bfc11985cbd1cf76a239ef'; 
var authToken = '452f1f1d86c183097a96db390ca55590'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
exports.template = {};


exports.template.sendText = function(req, res) {
  console.log("sending text");
  client.messages.create({  
    to:'+1',
    from: "+16266711727",    
    body:'Testing Twilio and node.js'

  }, function(err, message) { 
	console.log(message.sid); 
  })
};

