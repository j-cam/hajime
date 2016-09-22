var gulp = require('gulp');
var gulp = require('gulp');
var size = require('gulp-size');
var config = require('../tasks.config.json');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

var ghPages = require('gulp-gh-pages');

gulp.task('deploy:ghPages', function() {
  return gulp.src(config.deployment.ghPages.src)
    .pipe(ghPages());
});