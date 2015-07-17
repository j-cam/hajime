// Requiring Gulp
var gulp = require('gulp');
// Requiring Sass
var sass = require('gulp-sass');
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
    gulp.src('app/scss/styles.scss') // Gets the styles.scss file
        .pipe(sourcemaps.init()) // Initialize sourcemap plugin
        .pipe(sass()) // Passes it through a gulp-sass task
        .pipe(autoprefixer()) // Passes it through gulp-autoprefixer
        .pipe(sourcemaps.write()) // Writing sourcemaps
        .pipe(gulp.dest('app/css')) // Outputs it in the css folder
        // Reloading the stream
        .pipe(browserSync.reload({
            stream: true
        }));
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
