'use strict';

var gulp = require('gulp');
var size = require('gulp-size');
var config = require('../tasks.config.json');

var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var groupmq = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');


// Task: Handle Sass and CSS
gulp.task('styles', function() {
    return gulp.src(
            config.styles.files
        )
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }).on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'expanded'}
        ).on('error', sass.logError))
        // Combine media queries jacks up sourcemaps
        // change the environment flag in config to run
        .pipe( gulpif(config.environment.production, groupmq()))
        .pipe( sourcemaps.write('../maps'))
        .pipe( gulp.dest(
            config.styles.dest
        ))
        .pipe(size({ title: 'SIZE -> CSS', showFiles: true }))
});