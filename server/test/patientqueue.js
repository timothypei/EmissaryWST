var request = require('supertest');

var config = require('../config/config');

// Wrapper that creates admin user to allow api calls
var ConfigureAuth = require('./ConfigureAuth');
var Employee = require('../models/Employee');


describe("PatientQueue", function() {
    var url = "localhost:" + config.port;

    var adminCredentials;
    var employeeCredentials;
    var patient;

    before(function(done) {
      ConfigureAuth.setupAdmin(function(cred) {
        adminCredentials = cred;
        next();
      });

      function next() {
        ConfigureAuth.setupEmployee(function(cred) {
          employeeCredentials = cred;
          patient = {
            _admin_id: adminCredentials.admin._id,
            name: "Tony Montana",
            _doctor_id: employeeCredentials._id,
          };
          var em = new Employee();
          em._admin_id = adminCredentials.admin._id;
          em.email = ""; // Add YOUR email to test
          em.phone_number = ""; // Add YOUR phone number here to test
          _doctor_id = employeeCredentials._id;
          Employee.remove({},function(err) {
            if(err)
              throw(err);
            em.save(function(err, employ) {
              console.log(err);
              console.log("CREATED EMPLOYEE", employ);
              done();
            });
          });
        });
      }
      
    });


    it('should add patient to the queue', function(done){
      this.timeout(8000);
      request(url)
        .post('/api/patient/checkin')
        .query({email: adminCredentials.email, token: adminCredentials.token, isEmployee: false})
        .send({
          _admin_id: adminCredentials.admin._id,
          name: patient.name,
          _doctor_id: patient._doctor_id,
        })
        .expect(200)
        .end(function(err, res){
            res.body.should.have.property('queue');
            done();
        });

    });

    it('should not add patient to the queue', function(done){
        this.timeout(8000);
        request(url)
            .post('/api/patient/checkin')
            .query({email: adminCredentials.email, token: adminCredentials.token, isEmployee: false})
            .send({
                name: patient.name,
                _doctor_id: patient._doctor_id,
            })
            .expect(404)
            .end(function(err, res){
                res.body.should.have.property('error');
                done();
            });
    });

    it('should get curret patients in queue', function(done){
        this.timeout(8000);
        request(url)
            .get('/api/patient/getPatients/'+adminCredentials.admin._id)
            .query({email: adminCredentials.email, token: adminCredentials.token, isEmployee: false})
            .send()
            .expect(200)
            .end(function(err, res){
                should.exist(res.body);
                res.body.should.have.length.of.at.least(1);
                res.body.should.be.an.instanceof(Array);
                done();
            });
    });

    it('should not get current patients in queue', function(done){
        this.timeout(8000);
        request(url)
            .get('/api/patient/getPatients')
            .query({email: adminCredentials.email, token: adminCredentials.token, isEmployee: false})
            .send()
            .expect(404)
            .end(function(err, res){
                //res.body.should.have.property('error');
                done();
            });
    });

    it('should delete Patient', function(done){
        request(url)
            .get('/api/patient/getPatients/'+adminCredentials.admin._id)
            .query({email: adminCredentials.email, token: adminCredentials.token, isEmployee: false})
            .send()
            .end(function(err, res){
                var prevLen=0;
                var patientId;
                res.body.should.be.an.instanceof(Array);
                for(var i=0; i< res.body.length; i++){
                    prevLen++;
                    patientId=res.body[i]._id;
                }
                request(url)
                    .post('/api/patient/delete')
                    .query({email: adminCredentials.email, token: adminCredentials.token, isEmployee: false})
                    .send({
                        authId:adminCredentials.admin._id,
                        patientId:patientId
                    })
                    .expect(200)
                    .end(function(err, res){
                        should.exist(res.body);
                        res.body.should.be.an.instanceof(Array);
                        res.body.should.have.length.of(prevLen-1);
                        done();
                    });
            });
    });



    after(function(done) {
      var next = function next() {
        ConfigureAuth.cleanupEmployee(employeeCredentials.email, done);
      };
      ConfigureAuth.cleanupAuth(adminCredentials.email, next);
    });

  }
);
