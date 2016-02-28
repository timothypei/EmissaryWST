var gulp = require('gulp');

/* This will copy all our assets i.e. assets folder
 * to the dist folder.
 */
gulp.task('copy:assets', function () {
  return gulp.src('./client/assets/**')
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('copy:js', function () {
  return gulp.src('./client/js/**')
     .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy:css', function () {
  return gulp.src('./client/css/**')
     .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy:images', function () {
  return gulp.src('./client/img/**')
     .pipe(gulp.dest('./dist/images'));
});

gulp.task('copy:views', function () {
  return gulp.src('./client/views/*.html')
     .pipe(gulp.dest('./dist'));
});


/* This will copy all our bower dependencies
 * to the dist folder
 */
gulp.task('copy:bower-components', function () {
  return gulp.src('./client/bower_components/**')
    .pipe(gulp.dest('./dist/bower_components/'));
});



 //gulp.task('copy:views', function () {
 //return gulp.src([ './client/app/**/*.html'])
  // .pipe(gulp.dest('./dist/views/'));
//});
 //*/
