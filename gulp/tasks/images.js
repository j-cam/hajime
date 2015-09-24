'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');

var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
var newer = require('gulp-newer');

gulp.task('images', function () {

  return gulp.src(config.images.files)
    .pipe(newer(config.images.dest))
    // Caching images that ran through imagemin
    .pipe(cache(imageMin({
        interlaced: true
      })))
    .pipe(gulp.dest(config.images.dest))

});