var Authmodel = require('../models/Authmodel');


module.exports = function(req, res, next) {
  console.log("CUNT FUCK", req.query.email)
  if(!req.query.email) {
    console.log("FUCK")
    return res.sendStatus(401);
  }
  Authmodel.findOne({email: req.query.email}, function(err, user) {
    // if there are any errors, return the error before anything else
    if(err || !user) {
      console.log("ASS FUCK", err);
      console.log(user);
      return res.status(400).send(err);
    }
    if(user.token !== req.query.token) {
      console.log("fuasdklfjads")
      return res.status(401).send("Invalid token");
    }
    next();
  });
};
