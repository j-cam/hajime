var gulp = require('gulp');
var size = require('gulp-size');
var config = require('../tasks.config.json');


/*
Post CSS
 */
// var precss = require('precss');
var postcss = require('gulp-postcss');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');

var rename = require('gulp-rename');

var gulpif = require('gulp-if');
var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');


// Task: Handle Sass and CSS
gulp.task('styles', function() {

    return gulp.src(
            config.styles.files
        )
        .pipe(sourcemaps.init())

    .pipe(
        sass().on('error', sass.logError)
    )

    .pipe(
        sass({
            outputStyle: 'expanded'
        }).on(
            'error', sass.logError
        )
    )

    .pipe(
        postcss([
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false,
                add: true,
                remove: true,
            }),
            mqpacker({
                sort: true
            })
        ])
    )

    .pipe(
        gulpif(
            config.environment.production,
            cssnano({
                safe: true,
                discardComments: { removeAllButFirst: false },
                discardDuplicates: true,
            })
        ).on('error', gutil.log)
    )

    .pipe(
        gulpif(
            config.environment.development,
            cssnano({
                safe: true,
                discardComments: { removeAllButFirst: false },
                discardDuplicates: true,
                core: false,
            })
        ).on('error', gutil.log)
    )

    // .pipe( gulpif( config.environment.production,
    //      rename(config.styles.styleRename)
    //     ))
    //     .on('end', function(){
    //         gutil.log('Writing production styles as [style.css.liquid]...');
    //     })

    .pipe(sourcemaps.write('../maps/'))

    .pipe(gulp.dest(config.styles.dest))

    .pipe(
        size({
            title: 'Style.css ',
            showFiles: true
        })
    );

});
