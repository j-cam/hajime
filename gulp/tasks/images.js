'use strict';

var gulp = require('gulp');
var size = require('gulp-size');
var config = require('../tasks.config.json');

var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
var newer = require('gulp-newer');

gulp.task('images', function () {

  return gulp.src(config.images.files)
    //.pipe(newer(config.images.dest))
    .pipe(size({ title: 'images', showFiles: true }))
    // Caching images that ran through imagemin
    .pipe(cache(imageMin({ interlaced: true, progressive: true })))
    .pipe(gulp.dest(config.images.dest))

});