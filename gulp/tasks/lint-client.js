var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint-client', function() {
  return gulp.src(['./client/app/**/*.js'])
    .pipe(jshint('./client/.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
