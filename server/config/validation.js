var Authmodel = require('../models/Authmodel');


module.exports = function(req,res,next){
	if(!req.query.email)
		res.sendStatus(401);
   Authmodel.findOne({ email :  req.query.email }, function(err, user) {
	    // if there are any errors, return the error before anything else
	    if (err || !user)
	        return res.status(400).send(err);

	  if(user.token !== req.query.token)
	  	return res.status(400).send("invalid token");
	  else
	  	next();
  });
};