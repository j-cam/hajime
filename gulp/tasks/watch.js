'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');

var browserSync = require('browser-sync');



// Gulp check for watcing this file
// http://codepen.io/ScavaJripter/blog/how-to-watch-the-same-gulpfile-js-with-gulp


gulp.task('watch', function() {

  gulp.watch("gulpfile.js", ["default"]);
  gulp.watch(config.images.files, ['images']);
  gulp.watch(config.styles.files, ['styles']);
  gulp.watch(config.scripts.files, ['scripts']);
  gulp.watch(config.templates.files , ['templates']);
  gulp.watch(config.server.files, ['serve:reload']);

});