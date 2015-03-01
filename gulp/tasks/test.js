var gulp = require('gulp');
var mocha = require('gulp-mocha');

/* This will run our mocha tests */
gulp.task('test', function(){
   return gulp.src('./server/test/*.js', {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .pipe(exit());
});