var gulp = require('gulp');


/* This will create the dist folder
 * That is ready to serve by our backend
 */
gulp.task('dist', [
  'lint-server',
  'lint-client',
  'concat',
  'copy:bower-components',
  'bower',
  'copy:views',
  'copy:assets'
]);

/* Build the app without minification */
gulp.task('build:dev', ['dist']);

/* The default task */
gulp.task('default', ['build:dev']);
