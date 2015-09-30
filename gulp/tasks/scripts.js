'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');

var gutil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('scripts', function () {

  return browserify(config.scripts.main).bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('scripts:copy', function () {

    return gulp.src(config.scripts.copy)
    .pipe(gulp.dest(config.scripts.dest + 'vendor'));
});