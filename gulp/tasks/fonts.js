'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');

var newer = require('gulp-newer');


gulp.task('fonts', function() {

  return gulp.src(config.fonts.files)
    .pipe(newer(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest))

})