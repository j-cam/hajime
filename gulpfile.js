// Requiring Gulp
var gulp = require('gulp');
// Requiring Sass
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
// Requiring autoprefixer
var autoprefixer = require('gulp-autoprefixer');
// Requiring Sourcemaps
var sourcemaps = require('gulp-sourcemaps');
// Requiring Browser Sync
var browserSync = require('browser-sync');

gulp.task('hello', function() {
    console.log('Hello Sir!');
});


gulp.task('sass', function() {
    gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(cssGlobbing({
            // Configure it to use SCSS files
            extensions: ['.scss', '.sass', '.css']
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })) // Passes it through gulp-autoprefixer
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        // Reloading the stream
        // .pipe(browserSync.reload({
        //     stream: true
        // }));
});


// ['task', 'otherTask',...] runs watch after these tasks have completed
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/styles.scss', ['sass']);
    gulp.watch('app/index.html', browserSync.reload);
});


// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
})
