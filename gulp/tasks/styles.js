'use strict';

var gulp = require('gulp');
var size = require('gulp-size');
var config = require('../tasks.config.json');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');

var postcss = require('gulp-postcss');

var lost = require('lost');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var rucksack = require('rucksack-css');
var precss = require('precss');
var reporter = require('postcss-reporter');
var browserReporter = require('postcss-browser-reporter');



// Task: Handle Sass and CSS
gulp.task('styles', function() {

    var processors = [
        precss,
        rucksack,
        lost,
        mqpacker,
        autoprefixer({browsers: ['last 2 versions']}),
        reporter(),
    ];

    return gulp.src( config.styles.files )
        .pipe(sourcemaps.init())
        .pipe(postcss(processors).on('error', gutil.log))
        .pipe(cssnano({
            discardComments: { removeAll: false }
        })).on('error', gutil.log)
        //.pipe( gulpif(config.environment.production, cssnano({discardComments: {removeAll: true}})).on('error', gutil.log)))
        .pipe( sourcemaps.write('../maps'))
        .pipe( gulp.dest(config.styles.dest))
        .pipe(size({ title: 'SIZE -> CSS', showFiles: true }))
});