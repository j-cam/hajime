'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');
var gutil = require('gulp-util');

var plumber = require('gulp-plumber');

var newer = require('gulp-newer');
var nunjucksRender = require('gulp-nunjucks-render');


gulp.task('templates', function () {



  nunjucksRender.nunjucks.configure([config.templates.src]);

  gulp.src(config.templates.pages)
    .pipe(plumber())
    .pipe(nunjucksRender().on('error', gutil.log))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.templates.dest))

});