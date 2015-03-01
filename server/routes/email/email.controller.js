'use strict';

var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var nodemailer = require("nodemailer");

exports.template = {};


// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'testcse112@gmail.com',
        pass: 'robo_betty'
    }
});

var mailOptions = {
    from: "test ✔ <testcse112@gmail.com>", // sender address
    to: "michael.cieplak@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

exports.template.sendEmail = function(req, res) {
  console.log("sending email");

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
  });

};
