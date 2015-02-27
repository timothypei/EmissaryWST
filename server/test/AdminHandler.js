'use strict';

var should = require('chai').should();
var assert = require('chai').assert;
var request = require('supertest');
var mongoose = require('mongoose');

var AdminUser = require('../models/Authmodel');

module.exports.setupUser = function(url, obj) {

  // Generate random email address. Random added to potentially prevent
  // concurrency issues with tests running at the same time and hitting
  // duplicate unique email key errors.
  var email = "test@test.com";
  var password = "test_password";

  describe("Create Admin User", function() {
    describe("Signup User", function() {
      it("should signup new user", function(done) {
        request(url)
          .post('/auth/signup')
          .send({
            email: email,
            password: password
          })
          .expect(200)
          .end(function(){
            done();
          });
      });

      it("should login the user", function(done) {
        request(url)
          .post('/auth/login')
          .send({
            email: email,
            password: password
          })
          .expect(200)
          .end(function(err,res){
            if(err)
              throw(err);
            res.body.should.have.property('token');
            obj.token = res.body.token;
            done();
          });
      });

      it("should retrieve admin document", function(done) {
        AdminUser.findOne({email: email}, function(err, dbAdmin) {
          if(err)
            throw(err);
          obj.admin = dbAdmin;
          done();
        });
      });
    });
  });
};

module.exports.clearAdmin = function(url, setup) {
  describe("Clear Test Admin", function() {
      it("should remove the test admin", function(done) {
        AdminUser.remove({email: setup.admin.email}, function(err) {
          if(err)
            throw(err);
          done();
        });
      });
    });
};