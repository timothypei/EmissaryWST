var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul');
    exit = require('gulp-exit');

/* This will pipe our files to istanbul */
gulp.task('pre-test', function() {
    return gulp.src(['./server/models/*.js'])
    // This tells gulp which files you want to pipe
        //covering files
        .pipe(istanbul())
        // This overwrites `require` so it returns covered files
        .pipe(istanbul.hookRequire());
});
/* This will run our mocha tests */
gulp.task('test:server', ['pre-test'], function(){
   return gulp.src('./server/test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    .pipe(exit());
});
