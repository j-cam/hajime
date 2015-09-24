'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');

var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');


// Task: Handle Sass and CSS
gulp.task('styles', function() {
    return gulp.src(
            config.styles.files
        )
        .pipe(cssGlobbing({
            extensions: ['.scss', '.sass', '.css']
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', gutil.log))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({
            outputStyle: 'expanded'}
        ))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(
            config.styles.dest
        ))
});