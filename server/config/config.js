/**
 * Config var for app 
**/
module.exports = {
  mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/test',
  port: process.env.PORT || 4941
};
