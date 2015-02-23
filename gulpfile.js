var gulp = require('gulp');

var connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    del = require('del'),
    concat = require('gulp-concat'),
    mocha = require('gulp-mocha'),
    exit = require('gulp-exit'),
    wiredep = require('wiredep').stream,
    htmlify = require('gulp-angular-htmlify'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('lint', function() {
  return gulp.src(['./server/**/*.js','./client/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/* Remove the generated dist */
gulp.task('clean', function(cb) {
  del('./dist', cb);
});

/* This will add our bower dependencies to our index.html
 * so that we don't have to manually do it.
 */
gulp.task('bower', function () {
  return gulp.src('./client/index.html')
    .pipe(wiredep({
      directory: './client/bower_components'
    }))
    .pipe(gulp.dest('./dist/'));
});

/* This will copy all our bower dependencies
 * to the dist folder
 */
gulp.task('copy:bower-components', function () {
  return gulp.src('./client/bower_components/**')
    .pipe(gulp.dest('./dist/bower_components/'));
});

/* This will copy all our views
 * to the dist folder
 */
gulp.task('copy:views', function () {
  return gulp.src(['./client/index.html', './client/app/**/*.html'])
    .pipe(gulp.dest('./dist/views/'));
});

gulp.task('htmlify', ['copy:views'],function(){
  return gulp.src('./dist/**/*.html')
    .pipe(htmlify())
    .pipe(gulp.dest('./dist/'));
});

/* This will copy all our assets i.e. assets folder
 * to the dist folder.
 */
gulp.task('copy:assets', function () {
  return gulp.src('./client/assets/**')
    .pipe(gulp.dest('./dist/'));
});

/* This will create concatenate all our angular
 * code into one file the bundle.js and palce it
 * in the dist folder
 */
gulp.task('concat', function() {
  return gulp.src(['./client/app/app.module.js', './client/app/**/*.module.js', './client/app/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('ng-annotate', ['dist'], function () {
  return gulp.src('dist/bundle.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('dist/'));
});

/* Minify all css files */
gulp.task('minify:css', ['dist'], function() {
  return gulp.src('./client/assets/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/'))
});

/* Minify bundle.js */
gulp.task('minify:js', ['ng-annotate'], function() {
  return gulp.src('./dist/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

/* Serve our angular code. This will not use
 * Our actual backend. The serve will purely serve
 * the angular files.
 */
gulp.task('serve:frontend', ['build:dev'], function () {
  return connect.server({
    root: './dist/',
    port: 8080
  });
});

/* Watch Files For Changes */
gulp.task('frontend',['serve:frontend'], function() {
  gulp.watch('./client/bower_components', ['copy:bower-components', 'bower']);
  gulp.watch(['./client/index.html', './client/app/**/*'], ['concat', 'copy:views', 'bower']);
  gulp.watch('./client/assets/**', ['copy:assets']);
});

/* This will run our mocha tests */
gulp.task('test', function(){
   return gulp.src('./server/test/*.js', {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .pipe(exit());
});

/* This will create the dist folder
 * That is ready to serve by our backend
 */
gulp.task('dist', [
    'lint',
    'concat',
    'copy:bower-components',
    'bower',
    'copy:views',
    'copy:assets'
]);

/* Build the app without minification */
gulp.task('build:dev', ['dist']);

/* Build the app and minfy */
gulp.task('build:prod', ['minify:js', 'minify:css', 'htmlify']);

/* The default task */
gulp.task('default', ['build:dev']);
