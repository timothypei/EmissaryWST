var request = require('supertest');
var config = require('../config/config');
// Wrapper that creates admin user to allow api calls
var ConfigureAuth = require('./ConfigureAuth');

var Email = require('../notification/email');
var Text = require('../notification/text');

// array of employees. PLEASE only use your emails and phone numbers
// inside this array if testing..
var employees = [];

describe("Notification", function() {

    it('It should send an email', function(done){
      this.timeout(5000);
      Email.sendEmail(employees);
      done();
    });

    it('It should send an email', function(done){
      this.timeout(5000);
      Text.sendText(employees);
      done();
    });
  }
);
