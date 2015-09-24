'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');

var newer = require('gulp-newer');



gulp.task('templates', function () {

    return gulp.src(config.templates.files)
      .pipe(newer(config.templates.dest))
      .pipe(gulp.dest(config.templates.dest))

});