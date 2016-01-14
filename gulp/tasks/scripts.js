'use strict';

var gulp = require('gulp');
var size = require('gulp-size');
var config = require('../tasks.config.json');

var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var include = require("gulp-include");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('scripts', function () {

    return gulp.src(config.scripts.main)
    .pipe(include())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify().on('error', gutil.log))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(size({ title: 'SCRIPTS' }));
});

gulp.task('scripts:copy', function () {

    return gulp.src(config.scripts.copy)
    .pipe(gulp.dest(config.scripts.dest + 'vendor'));
});