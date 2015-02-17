// gulp
var gulp = require('gulp');

// plugins
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


// tasks
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

gulp.task('copy-bower-components', function () {
  gulp.src('./bower_components/**')
    .pipe(gulp.dest('dist/bower_components/'));
});


gulp.task('copy-views', function () {
  gulp.src('./app/**/*.html')
    .pipe(flatten())
    .pipe(gulp.dest('dist/views'));
});

gulp.task('copy-assets', function () {
  gulp.src('./assets/**')
    .pipe(gulp.dest('dist/'));
});

gulp.task('bower', function () {
  gulp.src('./index.html')
    .pipe(wiredep({
      directory: './bower_components'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('mocha', function () {
  gulp.src('app/**/*.test.js')
    .pipe(mocha())
    .pipe(exit());
});

gulp.task('concat', function() {
  var modules = filter('**/*.module.js');
  var scripts = filter(['**/*.js', '!**/*.module.js']);
  gulp.src(['./app/app.module.js', './app/**/*.module.js', './app/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/'));
  ;
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('./bower_components', ['copy-bower-components', 'bower']);
  gulp.watch(['./index.html', './app/**/*'], ['concat', 'copy-views', 'bower']);
  gulp.watch('./assets/**', ['copy-assets']);
});


gulp.task('connect', function () {
  connect.server({
    root: 'dist/',
    port: 8080
  });
});

// default task
gulp.task('default', [
    'concat',
    'copy-bower-components',
    'bower',
    'copy-views',
    'copy-assets',
    'connect',
    'watch'
]);

// build task
gulp.task('build',
  ['lint', 'minify-css', 'minify-js',  'minify-img', 'copy-html-files', 'copy-bower-components', 'copy-bootstrap', 'connectDist']
);

