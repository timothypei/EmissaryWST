var gulp = require('gulp');

/* This will copy all our bower dependencies
 * to the dist folder
 */
gulp.task('copy:bower-components', function () {
  return gulp.src('./client/bower_components/**')
    .pipe(gulp.dest('./dist/bower_components/'));
});