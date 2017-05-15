var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul');
    exit = require('gulp-exit');

/* This will pipe our files to istanbul */
gulp.task('pre-test', function() {
    // This tells gulp which files you want to pipe
    // In our case we want to pipe every `.js` file inside any folders inside `test`
    return gulp.src('./server/**/*.js')
        .pipe(istanbul())
        // This overwrites `require` so it returns covered files
        .pipe(istanbul.hookRequire());
});
/* This will run our mocha tests */
gulp.task('test:server', ['pre-test'], function(){
   return gulp.src('./server/test/*.js', {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    .pipe(exit());
});
