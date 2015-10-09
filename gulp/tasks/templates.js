'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');
var gutil = require('gulp-util');
var newer = require('gulp-newer');
var nunjucksRender = require('gulp-nunjucks-render');


gulp.task('templates', function () {


  nunjucksRender.nunjucks.configure([config.templates.src]);
  return gulp.src(config.templates.pages)
    .pipe(nunjucksRender().on('error', gutil.log))
    // .pipe(newer(config.templates.dest))
    .pipe(gulp.dest('dist'))

});