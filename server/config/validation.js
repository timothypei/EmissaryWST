module.exports = function(req,res,next){
	console.log('In another file');
	next();
};