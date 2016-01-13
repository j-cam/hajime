'use strict';

var gulp = require('gulp');
var size = require('gulp-size');
var config = require('../tasks.config.json');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');

var postcss = require('gulp-postcss');

var lost = require('lost');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var mqpacker = require('css-mqpacker');
var cssnext = require('postcss-cssnext');
var precss = require('precss');
var reporter = require('postcss-reporter');
var browserReporter = require('postcss-browser-reporter');



// Task: Handle Sass and CSS
gulp.task('styles', function() {
    var processors = [
      lost,
      autoprefixer({browsers: ['last 2 versions']}),
      cssnext,
      precss,
      mqpacker,
      cssnano,
      reporter,
      browserReporter
    ];

    return gulp.src( config.styles.files )
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))

        // Combine media queries jacks up sourcemaps
        // change the environment flag in config to run
        // .pipe( gulpif(config.environment.production, groupmq()))
        .pipe( sourcemaps.write('../maps'))
        .pipe( gulp.dest(config.styles.dest))
        //.pipe(size({ title: 'SIZE -> CSS', showFiles: true }))
});