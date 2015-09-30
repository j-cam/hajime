'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');

var newer = require('gulp-newer');
var nunjucksRender = require('gulp-nunjucks-render');


gulp.task('templates', function () {


  nunjucksRender.nunjucks.configure([config.templates.base]);
  return gulp.src(config.templates.files)
    .pipe(nunjucksRender())
    .pipe(newer(config.templates.dest))
    .pipe(gulp.dest(config.templates.dest))

});