var gulp = require('gulp');

var connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    del = require('del'),
    concat = require('gulp-concat'),
    mocha = require('gulp-mocha'),
    exit = require('gulp-exit'),
    flatten = require('gulp-flatten'),
    wiredep = require('wiredep').stream;


gulp.task('lint', function() {
  gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src('app/**/*.css')
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('dist/assets/'))
});

gulp.task('minify-js', function() {
  gulp.src('app/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
});

gulp.task('mocha', function () {
  gulp.src('app/**/*.test.js')
    .pipe(mocha())
    .pipe(exit());
});

/* Remove the generated dist folder from backend folder */
gulp.task('clean', function() {
  del('./server/dist');
  del('./dist');
  del('./client/dist');
});

/* This will add our bower dependencies to our index.html
 * so that we don't have to manually do it.
 */
gulp.task('bower', function () {
  gulp.src('./client/index.html')
    .pipe(wiredep({
      directory: './client/bower_components'
    }))
    .pipe(gulp.dest('./dist/'));
});

/* This will copy all our bower dependencies
 * to the dist folder
 */
gulp.task('copy-bower-components', function () {
  gulp.src('./client/bower_components/**')
    .pipe(gulp.dest('./dist/bower_components/'));
});

/* This will copy all our views
 * to the dist folder
 */
gulp.task('copy-views', function () {
  gulp.src('./client/app/components/**/*.html')
    .pipe(gulp.dest('./dist/views/components/'));
  gulp.src('./client/app/shared/**/*.html')
    .pipe(gulp.dest('./dist/views/shared/'));
});

/* This will copy all our assets i.e. assets folder
 * to the dist folder.
 */
gulp.task('copy-assets', function () {
  gulp.src('./client/assets/**')
    .pipe(gulp.dest('./dist/'));
});

/* This will create concatenate all our angular
 * code into one file the bundle.js and palce it
 * in the dist folder
 */
gulp.task('concat', function() {
  gulp.src(['./client/app/app.module.js', './client/app/**/*.module.js', './client/app/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/'));
});

/* Watch Files For Changes */
gulp.task('frontend',['serve:frontend'], function() {
  gulp.watch('./client/bower_components', ['copy-bower-components', 'bower']);
  gulp.watch(['./client/index.html', './client/app/**/*'], ['concat', 'copy-views', 'bower']);
  gulp.watch('./client/assets/**', ['copy-assets']);
});

/* Serve our angular code. This will not use
 * Our actual backend. The serve will purely serve
 * the angular files.
 */
gulp.task('serve:frontend', ['build'], function () {
  connect.server({
    root: './dist/',
    port: 8080
  });
});

gulp.task('test', function(){
  gulp.src('./server/test/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    .once('end', function () {
      process.exit();
  });
});

/* This will create the dist folder
 * That is ready to serve by our backend
 */
gulp.task('build', [
    'concat',
    'copy-bower-components',
    'bower',
    'copy-views',
    'copy-assets'
]);

/* The default task */
gulp.task('default', ['build']);