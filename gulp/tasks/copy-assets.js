var gulp = require('gulp');

/* This will copy all our assets i.e. assets folder
 * to the dist folder.
 */
gulp.task('copy:assets', function () {
  return gulp.src('./client/assets/**')
    .pipe(gulp.dest('./dist/'));
});