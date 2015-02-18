var gulp = require('gulp');

var connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    filter = require('gulp-filter'),
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

gulp.task('clean', function() {
  gulp.src('dist/')
    .pipe(clean({force: true}));
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

/* This will add our bower dependencies to our index.html
 * so that we don't have to manually do it.
 */
gulp.task('bower', function () {
  gulp.src('./index.html')
    .pipe(wiredep({
      directory: './bower_components'
    }))
    .pipe(gulp.dest('./dist/'));
});

/* This will copy all our bower dependencies
 * to the dist folder
 */
gulp.task('copy-bower-components', function () {
  gulp.src('./bower_components/**')
    .pipe(gulp.dest('./dist/bower_components/'));
});

/* This will copy all our views
 * to the dist folder
 */
gulp.task('copy-views', function () {
  gulp.src('./app/**/*.html')
    .pipe(flatten())
    .pipe(gulp.dest('./dist/views'));
});

/* This will copy all our assets i.e. assets folder
 * to the dist folder.
 */
gulp.task('copy-assets', function () {
  gulp.src('./assets/**')
    .pipe(gulp.dest('./dist/'));
});

/* This will create concatenate all our angular
 * code into one file the bundle.js and palce it
 * in the dist folder
 */
gulp.task('concat', function() {
  gulp.src(['./app/app.module.js', './app/**/*.module.js', './app/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/'));
});

/* Watch Files For Changes */
gulp.task('watch', function() {
  gulp.watch('./bower_components', ['copy-bower-components', 'bower']);
  gulp.watch(['./index.html', './app/**/*'], ['concat', 'copy-views', 'bower']);
  gulp.watch('./assets/**', ['copy-assets']);
});

/* Serve our angular code. This will not use
 * Our actual backend. The serve will purely serve
 * the angular files.
 */
gulp.task('serve', function () {
  connect.server({
    root: 'dist/',
    port: 8080
  });
});

/* This moves our packaged angular app (i.e. dist folder)
 * To the server so that it can serve it.
 */
gulp.task('export-dist', ['package'], function(){
  gulp.src('./dist/**').pipe(gulp.dest('../server/dist'))
});

/* This will create the dist folder
 * That is ready to serve by our backend
 */
gulp.task('package', [
    'concat',
    'copy-bower-components',
    'bower',
    'copy-views',
    'copy-assets'
]);

/* The default task */
gulp.task('default', [
  'package',
  'serve',
  'watch'
]);