var should = require('chai').should();
var asser = require('chai').assert;
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config/config');

var AdminUser = require('../models/Authmodel')

/********** TEMPLATE TESTING **********/
var templateFormId = null;
var templateForm = {
  "form_id": 1,
  "form_name": "My Form",
  "form_fields": [
    {
      "field_id": 1,
      "field_title": "Name",
      "field_type": "textfield",
      "field_value": "",
      "field_required": true,
      "field_disabled": false
    },
    {
      "field_id": 3,
      "field_title": "Email",
      "field_type": "email",
      "field_value": "",
      "field_required": true,
      "field_disabled": false
    },
    {
      "field_id": 4,
      "field_title": "Are you sick",
      "field_type": "checkbox",
      "field_value": "",
      "field_required": true,
      "field_disabled": false
    }
  ]
};

describe('Submit template form', function(){
  var url = "localhost:" + config.port;

  var admin = null;
  before(function(done){
    mongoose.connect(config.mongoDBUrl);
    var newAdmin = new AdminUser();
    newAdmin.local.email = "test@test.com";
    newAdmin.local.password = "password_secret";
    newAdmin.save(function(err, savedAdmin){
      if (err){
        throw(err);
        return;
      }
      admin = savedAdmin;
      done();
    });
  });

  describe('POST /api/form/template', function(){
    it('Template should be saved', function(done){
      request(url)
        .post('/api/form/template')
        .send({
          _admin_id: admin._id,
          template: templateForm
        })
        .end(function(err, res){
          templateFormId = res.body._id;
          res.body.should.have.property('_admin_id').and.be.equal(''+admin._id);
          res.body.should.have.property('template').and.be.instanceof(Object);
          done();
        });
    });
  });

  describe('GET /api/form/template/:id', function(){
    it('Should respond with template data', function(done){
      request(url)
        .get('/api/form/template/' + templateFormId)
        .end(function(err, res){
          res.body.should.have.property('_id');
          res.body.should.have.property('_admin_id');
          res.body.should.have.property('template').and.be.instanceof(Object);

          res.body.template.should.deep.equal(templateForm);
          res.body._id.should.equal(templateFormId);
          done();
        });
    });
  });

  describe('GET /api/form/template/company/:id', function(){
    it('Should respond with company template data', function(done){
      request(url)
        .get('/api/form/template/company/' + admin._id)
        .end(function(err, res){
          res.body.should.have.property('_id');
          res.body.should.have.property('_admin_id');
          res.body.should.have.property('template').and.be.instanceof(Object);

          res.body.template.should.deep.equal(templateForm);
          res.body._id.should.equal(templateFormId);
          done();
        });
    });
  });

  describe('DELETE /api/form/template/:template_id', function(){
    it('Should delete the template data', function(done){
      request(url)
        .delete('/api/form/template/' + templateFormId)
        .end(function(err, res){
          res.body.should.have.property('_id');
          res.body.should.have.property('_admin_id');
          res.body.should.have.property('template').and.be.instanceof(Object);

          res.body.template.should.deep.equal(templateForm);
          res.body._id.should.equal(templateFormId);
          done();
        });
    });
  });


});
/********** PATIENT FORM TESTING **********/

var submittedForm = {
  "form_id": "1",
  "form_name": "My Test Form",
  "form_fields": {
    "1": {
      "field_id": 1,
      "field_title": "First Name",
      "field_type": "textfield",
      "field_value": "John",
      "field_required": true,
      "field_disabled": false
    },
    "2": {
      "field_id": 2,
      "field_title": "Last Name",
      "field_type": "textfield",
      "field_value": "Doe",
      "field_required": true,
      "field_disabled": false
    },
    "3": {
      "field_id": 3,
      "field_title": "Gender",
      "field_type": "radio",
      "field_value": "1",
      "field_required": true,
      "field_disabled": false,
      "field_options": [
        {
          "option_id": 1,
          "option_title": "Male",
          "option_value": 1
        },
        {
          "option_id": 2,
          "option_title": "Female",
          "option_value": 2
        }
      ]
    },
    "4": {
      "field_id": 4,
      "field_title": "Email Address",
      "field_type": "email",
      "field_value": "test@example.com",
      "field_required": true,
      "field_disabled": false
    },
    "5": {
      "field_id": 5,
      "field_title": "Password",
      "field_type": "password",
      "field_value": "hello",
      "field_required": true,
      "field_disabled": false
    },
    "6": {
      "field_id": 6,
      "field_title": "Birth Date",
      "field_type": "date",
      "field_value": "01.21.1980",
      "field_required": true,
      "field_disabled": false
    },
    "7": {
      "field_id": 7,
      "field_title": "Your browser",
      "field_type": "dropdown",
      "field_value": "3",
      "field_required": false,
      "field_disabled": false,
      "field_options": [
        {
          "option_id": 1,
          "option_title": "-- Please Select --",
          "option_value": 1
        },
        {
          "option_id": 2,
          "option_title": "Internet Explorer",
          "option_value": 2
        },
        {
          "option_id": 3,
          "option_title": "Google Chrome",
          "option_value": 3
        },
        {
          "option_id": 4,
          "option_title": "Mozilla Firefox",
          "option_value": 4
        }
      ]
    },
    "8": {
      "field_id": 8,
      "field_title": "Additional Comments",
      "field_type": "textarea",
      "field_value": "test",
      "field_required": false,
      "field_disabled": false
    },
    "9": {
      "field_id": 9,
      "field_title": "I accept the terms and conditions.",
      "field_type": "checkbox",
      "field_value": "1",
      "field_required": true,
      "field_disabled": false
    },
    "10": {
      "field_id": 10,
      "field_title": "I have a secret.",
      "field_type": "hidden",
      "field_value": "X",
      "field_required": false,
      "field_disabled": false
    }
  },
  "submitted": true
}

describe('Submitted Patient Form', function(){
  var url = "localhost:" + config.port;

  var admin = null;
  before(function(done){
    mongoose.connect(config.mongoDBUrl);
    var newAdmin = new AdminUser();
    newAdmin.local.email = "test@test.com";
    newAdmin.local.password = "password_secret";
    newAdmin.save(function(err, savedAdmin){
      if (err){
        throw(err);
        return;
      }
      admin = savedAdmin;
      done();
    });
  });

  describe('POST /api/form/patient', function(){
    it('should save submitted form', function(done){
      request(url)
        .post('/api/form/patient')
        .send({
          _admin_id: admin._id,
          form: submittedForm,
          firstName: "Jimbo",
          lastName: "Cruise",
          email: "jcruise@tomcruise.com"
        })
        .end(function(err, res){
          //console.log(err);
          //console.log(res);
          res.body.should.have.property('form').and.be.instanceof(Object);
          res.body.should.have.property('_admin_id').and.be.equal(''+admin._id);
          submittedFormId = res.body._id;
          done();
        });
    });
  });

  describe('GET /api/form/:form_id', function(){
    it('should respond with submitted form data', function(done){
      request(url)
        .get('/api/form/patient/' + submittedFormId)
        .end(function(err, res){
          res.body.should.have.property('_id');
          res.body.should.have.property('firstName');
          res.body.should.have.property('lastName');
          res.body.should.have.property('email');
          res.body.should.have.property('_admin_id');
          res.body.should.have.property('date');
          res.body.should.have.property('form').and.be.instanceof(Object);

          res.body.form.should.deep.equal(submittedForm);
          res.body._id.should.equal(submittedFormId);
          done();
        });
    });
  });



});
