/**
 * Config var for app
**/
module.exports = {
  //mongoDBUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/test',
  mongoDBUrl: process.env.MONGODB_URL || 'mongodb://bluejay:toomanysecrets@ds047581.mongolab.com:47581/robobetty-test',
  port: process.env.PORT || 4941
};
