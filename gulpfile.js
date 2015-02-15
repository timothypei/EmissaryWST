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

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/assets/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
  gulp.src('dist/*')
    .pipe(clean({force: true}));
  gulp.src('app/bundled.js')
    .pipe(clean({force: true}));
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['app/**/*.css', '!app/assets/bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('dist/assets/'))
});

gulp.task('minify-js', function() {
  gulp.src(['app/**/*.js', '!app/assets/bower_components/**', '!app/bundled.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
});

gulp.task('copy-bower-components', function () {
  gulp.src('app/assets/bower_components/**')
    .pipe(gulp.dest('dist/assets/bower_components/'));
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

gulp.task('browserify', function() {
  gulp.src(['./app/app.module.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('bundled.js'))
    .pipe(gulp.dest('./app/'))
});

gulp.task('concat', function() {
  var modules = filter('**/*.module.js');
  var src = filter(['**/*.js', '!**/*.module.js']);
  gulp.src(['./app/**/*.js', '!./app/assets/**'])
    .pipe(src)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8080
  });
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});

// default task
gulp.task('default',
  ['lint', 'browserify', 'connect']
);

// build task
gulp.task('build',
  ['lint', 'minify-css', 'minify-js',  'minify-img', 'copy-html-files', 'copy-bower-components', 'copy-bootstrap', 'connectDist']
);

