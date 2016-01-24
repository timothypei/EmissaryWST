/**
 * Config var for app
**/
module.exports = {
  mongoDBUrl: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/test',
  port: process.env.PORT || 4941,
  secret: process.env.SECRET || 'mysecret'
};
