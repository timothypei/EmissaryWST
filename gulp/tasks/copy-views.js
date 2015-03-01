var gulp = require('gulp');

/* This will copy all our views
 * to the dist folder
 */
gulp.task('copy:views', function () {
  return gulp.src(['./client/index.html', './client/app/**/*.html'])
    .pipe(gulp.dest('./dist/views/'));
});