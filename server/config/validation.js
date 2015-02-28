var Authmodel = require('../models/Authmodel');
var Employee = require('../models/Employee');


module.exports = function(req, res, next) {
  if(!req.query.email)
    return res.sendStatus(401);

  var user = Authmodel;
  if(req.query.isEmployee)
    user = Employee;

  user.findOne({email: req.query.email}, function(err, user) {
    // if there are any errors, return the error before anything else
    if(err || !user)
      return res.status(400).send(err);
    if(user.token !== req.query.token)
      return res.status(401).send("Invalid token");
    next();
  });
  
};
