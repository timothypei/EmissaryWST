var request = require('supertest');
var config = require('../config/config');
// Wrapper that creates admin user to allow api calls
var ConfigureAuth = require('./ConfigureAuth');


describe("Notification", function() {
    var url = "localhost:" + config.port;

    var credentials;  // variable to hold all the need authentication variables.

    // before function is called at the very beginning of the 'Forms' test suite,
    // no tests are run until the done() callback is called.
    before(function(done) { 
      // setupAdmin will create and admin and log you in, give it a callback that will give you 
      // the credentials you need. Make sure to call done() inside ConfigureAuth's callback!
      ConfigureAuth.setupAdmin(function(cred) {
        credentials = cred;
        done();
      });
    });


    describe('POST /api/email/sendEmail', function(){
      it('It should send an email', function(done){
        request(url)
        .post('/api/email/sendEmail')
        .end(function(err, res){
          done();
        });
      });
    });

   describe('POST /api/text/sendText', function(){
      it('It should send an email', function(done){
        request(url)
        .post('/api/text/sendText')
        .end(function(err, res){
          done();
        });
      });
    });


    after(function(done) {
      // give cleanupAuth the email of the admin user it created earlier.
      ConfigureAuth.cleanupAuth(credentials.email, done);
    });
  }
);
