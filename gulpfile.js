// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var mocha = require('gulp-mocha');
var exit = require('gulp-exit');

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
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
  gulp.src(['app/**/*.css', '!app/bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('dist/assets/'))
});

gulp.task('minify-js', function() {
  gulp.src(['app/**/*.js', '!app/bower_components/**', '!app/bundled.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
});

gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('dist/bower_components/'));
});

gulp.task('copy-bootstrap', function () {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('app/assets/css'));
  gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('app/assets/js'));
});

gulp.task('copy-html-files', function () {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist/'));
});


var wiredep = require('wiredep').stream;

gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: './app/bower_components'
    }))
    .pipe(gulp.dest('./dist'));
});


gulp.task('mocha', function () {
  gulp.src('app/**/*.test.js')
    .pipe(mocha())
    .pipe(exit());
});

gulp.task('concat', function() {
  var modules = filter('**/*.module.js');
  var src = filter(['**/*.js', '!**/*.module.js']);

  gulp.src(['./app/app.module.js', './app/**/*.js', '!./app/assets/**', '!./app/bower_components/**'])
    .pipe(concat('bundle.js')).pipe(gulp.dest('./dist/'))
  ;

});

gulp.task('connect', function () {
  connect.server({
    root: 'dist/',
    port: 8080
  });
});

// default task
gulp.task('default',
  ['concat', 'copy-bower-components', 'bower', 'connect']
);

// build task
gulp.task('build',
  ['lint', 'minify-css', 'minify-js',  'minify-img', 'copy-html-files', 'copy-bower-components', 'copy-bootstrap', 'connectDist']
);

