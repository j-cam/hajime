'use strict';

var gulp = require('gulp');
var size = require('gulp-size');
var config = require('../tasks.config.json');

var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('scripts', function () {

  return browserify(config.scripts.main).bundle()
    .on('error', function (err) {
            console.log(err.toString());
            this.emit("end");
        })
    //Pass desired output filename to vinyl-source-stream

    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify().on('error', gutil.log))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(size({ title: 'SCRIPTS' }));
});

gulp.task('scripts:copy', function () {

    return gulp.src(config.scripts.copy)
    .pipe(gulp.dest(config.scripts.dest + 'vendor'));
});