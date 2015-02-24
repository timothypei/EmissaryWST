var chai = require('chai');
var should = chai.should();
var Theme = require('../models/Theme');

describe('Theme Settings Model', function() {
                  it('should create(POST) a new setting', function(done) {
                    var theme = new Theme({
                        theme.user_id = "test";//company or user id
                        theme.form_color = "default";
                        theme.background_img = "default";
                        theme.displayPhone = false;
                        theme.displayClock = false;
                        theme.displaySignature = false;
                        theme.additionalComments = false;
                    });
                    theme.save(function(err) {
                          if (err) return done(err);
                          done();
                    });
                  });
                  
                  it('should GET theme setting', function(done) {
                    Theme.findOne({user_id: "test"}, function(err, theme){
                              if (err) return done(err);
                                theme.background_img.should.equal('default');
                                theme.form_color.should.equal('default');
                                theme.displayClock.should.equal(false);
                                theme.displayPhone.should.equal(false);
                                theme.displaySignature.should.equal(false);
                                theme.additionalComments.should.equal(false);
                                done();
                    });
                  });

                   it('should update(PUT) theme setting', function(done) {
                      Theme.findOne({user_id: "test"}, function(err, theme){
                              theme.user_id = "test";//company or user id
                              theme.form_color = "default";
                              theme.background_img = "default";
                              theme.displayPhone = false;
                              theme.displayClock = true;
                              theme.displaySignature = false;
                              theme.additionalComments = true;
                              theme.save(function(err) {
                                        if (err) return done(err);
                                        theme.background_img.should.equal('default');
                                        theme.form_color.should.equal('default');
                                        theme.displayClock.should.equal(true);
                                        theme.displayPhone.should.equal(false);
                                        theme.displaySignature.should.equal(false);
                                        theme.additionalComments.should.equal(true);
                                        done();
                              });
                      });
                  });

                    it('should remove(DELETE) theme setting', function(done) {
                       Theme.remove({user_id: "test"}, function(err, theme){
                              if (err) return done(err);
                                theme.should.equal(1);
                                done();
                      });
                  });

});
