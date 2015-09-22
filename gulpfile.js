// Requiring Gulp
var gulp = require('gulp');
var config = require('./build.config.json');

var newer = require('gulp-newer');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var util = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imageMin = require('gulp-imagemin');
var browserSync = require('browser-sync');


// Gulp check for watcing this file
gulp.slurped = false;

// Trigger
var production = true;


gulp.task('clean', function () {
    // Clear the destination folder
    gulp.src(config.root + '/**/*.*', { read: false })
        .pipe(clean({ force: true }));
});





// Task: Handle Sass and CSS
gulp.task('styles', function() {
    gulp.src(
            config.styles.files
        )

        .pipe(cssGlobbing({
            extensions: ['.scss', '.sass', '.css']
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', util.log))
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
        //.pipe(browserSync.reload({stream:true}));
});



// Task: Handle scripts
gulp.task('scripts', function () {
  return gulp.src(
        config.scripts.files
    )
    .pipe(concat(
      'main.js'
    ))
    .pipe(gulpIf(production, uglify()))
    .pipe(gulpIf(production, rename({
      suffix: '.min'
    })))
    .pipe(gulp.dest(
      config.scripts.dest
    ))
    .pipe(browserSync.reload({stream:true}));
});


// Task: Handle images
gulp.task('images', function () {
  return gulp.src(config.images.files)
    .pipe(gulpIf(production, imageMin()))
    .pipe(gulp.dest(
      config.images.dest
    ))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('templates', function () {
    gulp.src(config.templates.files)
    .pipe(newer(config.templates.dest))
    .pipe(gulp.dest(config.templates.dest))
    .pipe(browserSync.reload({stream:true}));
});


// ['task', 'otherTask',...] runs watch after these tasks have completed
gulp.task('watch', ['browserSync', 'styles'], function() {


    if(!gulp.slurped){
        gulp.watch("gulpfile.js", ["default"]);
        gulp.watch(config.styles.files, ['styles']);
        gulp.watch(config.scripts.files, ['scripts']);
        gulp.watch(config.templates.files , ['templates']);
        gulp.watch( config.root, browserSync.reload);
        gulp.slurped = true;
    }


});


/// task: BrowserSync
// Description: Run BrowserSync server with disabled ghost mode
gulp.task('browserSync', function() {
  browserSync({
    server: {
        baseDir: config.root
    },
    ghostMode: true,
    open: "external"
  });
});


gulp.task('default', ['styles', 'scripts', 'images', 'templates' ]);