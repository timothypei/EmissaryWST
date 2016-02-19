var request = require('supertest');
var config = require('../config/config');
var ConfigureAuth = require('./ConfigureAuth');
var Company = require('../models/Company');

describe('Company Test', function() {
  var url = "localhost:" + config.port;
  var token;
  var currCompany;

  var email = "test3@test.edu";
  var password = "test";
  var credit_card_number="1231231241251";
  var name = "test";
  var expiration_date="6/17";
  var phone_number="1234567890";

  var mynewemail = "test2@test.edu";
  var mynewpassword = "test2";

  var userID = null;

  before(function(done) {
    request(url)
        .post('/api/company/signup')
        .send({
          email: email,
          password: password,
          credit_card_number:credit_card_number,
          name:name,
          expiration_date:expiration_date,
          phone_number:phone_number
        })
        .expect(200)
        .end(function(err,res){
          if(err)
            throw(err);
          res.body.should.have.property('token');
          Company.findOne({email:email}, function(err, company) {
            if(err)
              throw(err);
            company.should.have.property('_id');
            currCompany = company;
            credentials = {
              email: email,
              password: password,
              token: res.body.token
            };
            done();
          });
        });
  });


  it("should not signup the user", function(done) {
    request(url)
        .post('/api/company/signup')
        .send({
          email: email,
          password: password,
          credit_card_number:credit_card_number,
          name:name,
          expiration_date:expiration_date,
          phone_number:phone_number
        })
        .expect(400)
        .end(function(err,res){
          res.should.have.property('error');
          done();
        });
  });

  it("should login the user", function(done) {
    request(url)
      .post('/api/company/login')
      .send({
        email: email,
        password: password
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
      done();
      });
  });

  it('should update user\'s password', function(done) {
    request(url)
      .put('/api/company/setting/' + credentials.email)
      .send({
        email: credentials.email,
        password: credentials.password,
        newpassword: mynewpassword
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        done();
      });
  });

  it('should update user\'s email', function(done) {
    request(url)
      .put('/api/company/setting/' + credentials.email)
      .send({
        email: credentials.email,
        password: mynewpassword,
        newemail: mynewemail
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        done();
      });
  });

  it("should login the user using new credentials", function(done) {
    request(url)
      .post('/api/company/login')
      .send({
        email: mynewemail,
        password: mynewpassword
      })
      .expect(200)
      .end(function(err,res){
          if(err)
            throw(err);
        res.body.should.have.property('token');
        done();
      });
  });

  it('should restore user\'s credentials', function(done) {
    request(url)
      .put('/api/company/setting/' + mynewemail)
      .send({
        email: mynewemail,
        password: mynewpassword,
        newemail: credentials.email,
        newpassword: credentials.password
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        done();
      });
  });

  it("should login the user using original credentials", function(done) {
    request(url)
      .post('/api/company/login')
      .send({
        email: credentials.email,
        password: credentials.password
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        res.body.should.have.property('token');
        done();
      });
  });
  it("Put /api/company/updatePaidTime/:id", function(done) {
    request(url)
        .put('/api/company/updatePaidTime/'+currCompany._id)
        .send()
        .expect(200)
        .end(function(err,res){
          if(err)
            throw(err);
          res.body.should.have.property('paid_time');
          Company.findOne({_id:currCompany._id}, function(err, c){
            if(err) throw(err);
            c.paid_time.should.not.equal(currCompany.paid_time);
            done();
          });
        });
  });

  after(function(done) {
    Company.remove({email: email}, function(err) {
      if(err)
        throw(err);
      Company.remove({email: mynewemail}, function(err) {
        if(err)
          throw(err);
        done();
      });
    });
  });
});
