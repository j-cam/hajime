'use strict';

var gulp = require('gulp');
var path = require('path');
var nano = require('cssnano');
var panini = require('panini');
var size = require('gulp-size');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var svgmin = require('gulp-svgmin');
var rimraf = require('rimraf').sync;
var buffer = require('vinyl-buffer');
var include = require("gulp-include")
var postcss = require('gulp-postcss');
var cheerio = require('gulp-cheerio');
var changed = require('gulp-changed');
var mqpacker = require('css-mqpacker');
var imageMin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var autoprefixer = require('autoprefixer');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');
var objectFitImages = require('postcss-object-fit-images');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


const BUILD_PATH = 'docs';

const SASS_INCLUDE_PATHS = [
  path.join(__dirname, 'node_modules')
];

/* ==========================================================================
ENVIRONMENT
========================================================================== */
gulp.task('env:prod', function() {
	argv.prod = true;;
});
gulp.task('env:dev', function() {
	argv.dev = true;
});

/* ==========================================================================
SERVE
========================================================================== */
gulp.task('serve', () => {
  return browserSync.init({
    server: {
      baseDir: BUILD_PATH + '/'
    },
    directory: false,
    scroll: true,
    injectChanges: true,
    open: false,
    files: [
      BUILD_PATH + '/assets/css/**/*.css',
      BUILD_PATH + '/assets/css/**/*.js',
    ],
  });
});


/* ==========================================================================
CLEAN
command: gulp clean
dependencies: rimraf
========================================================================== */
gulp.task('clean', () => {
  rimraf(BUILD_PATH);
});

/* ==========================================================================
STYLES
command: gulp styles
dependencies: gulp-sourcemaps gulp-notify browser-sync gulp-sass gulp-postcss autoprefixer postcss-object-fit-images cssnano
========================================================================== */
gulp.task('styles', () => {

  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: SASS_INCLUDE_PATHS,
  };
  // Sort Media queries
  var mqpackerOptions = {
    sort: true
  };
  var nanoOptions = {
    core: true,
    discardComments: {
      removeAllButFirst: true
    },
    safe: true,
    zindex: false
  };

  var stream = gulp.src('src/scss/style.scss')
    .pipe(size())
    .pipe(gulpif(argv.dev, sourcemaps.init()))
    .pipe(sass(sassOptions)
      .on("error", notify.onError({
        title: "Sass Error",
        subtitle: [
          '<%= error.relativePath %>',
          '<%= error.line %>'
        ].join(':'),
        message: [
          '<%= error.messageOriginal %> in <%= error.relativePath %> (line <%= error.line %>)',
          // '\n Original Message: <%= error.message %>'
        ],
        onLast: true,
        sound: false
      }))
    )
    .pipe(postcss([
      objectFitImages(),
      autoprefixer(),
      mqpacker(mqpackerOptions),
      nano(nanoOptions)
    ]))
    .pipe(gulpif(argv.dev, sourcemaps.write('../maps')))
    .pipe(gulp.dest(BUILD_PATH + '/assets/css/'))
    .pipe(reload({
      stream: true,
      match: '**/*.css'
    }));
});

/* ==========================================================================
SCRIPTS
command: gulp scripts
dependencies: gulp-sourcemaps gulp-include gulp-uglify
========================================================================== */
gulp.task('scripts', () => {
  return gulp.src('src/js/main.js')
    .pipe(include())
    .pipe(gulpif(argv.dev, sourcemaps.init({loadMaps: true})))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulpif(argv.dev, sourcemaps.write('../maps')))
    .pipe(gulp.dest(BUILD_PATH + '/assets/js/'))
    .pipe(size({
      title: 'SCRIPTS'
    }));
});

/* ==========================================================================
SCRIPTS:VENDOR:COPY - Vendor scripts copied rather than concatenated
command: gulp scripts
dependencies: none
========================================================================== */
gulp.task('scripts:vendor:copy', () => {
  return gulp.src('src/js/vendor/copy/**/*.js')
  .pipe(size({ title: 'SCRIPTS:VENDOR:COPY'}))
    .pipe(gulp.dest(BUILD_PATH + '/assets/js/vendor'));
});


/* ==========================================================================
 * MEDIA
 * IMAGES, SVG, IMAGE SPRITE, SVG SPRITE
========================================================================== */

/* ==========================================================================
IMAGES - image optimization (png,gif,jpg)
command: gulp images
dependencies: gulp-changed gulp-imagemin
========================================================================== */
gulp.task('images', () => {
  return gulp.src(['src/media/img/**/*'])
    .pipe(changed(BUILD_PATH + '/assets/img'))
    .pipe(size({ title: 'IMAGES'}))
    .pipe(imageMin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(BUILD_PATH + '/assets/img'))
});

/* ==========================================================================
SVG - svg optimization
command: gulp svg
dependencies: gulp-changed gulp-svgmin
========================================================================== */
gulp.task('svg', () => {
  return gulp.src(['src/media/svg/**/*'])
    .pipe(changed(BUILD_PATH + 'assets/img', {extension: '.svg'}))
    .pipe(size({ title: 'SVG'}))
    .pipe(svgmin().on('error', gutil.log))
    .pipe(gulp.dest(BUILD_PATH + '/assets/img'))
});

/* ==========================================================================
SPRITE:IMAGES - Converts .png files to a spritesheet and generates a SCSS file
of mixins for using the sprites.

Requirements:

Files must be .png and each must have a retina version and normal version.
Retina version must be named the same as the normal version but with the
suffix of @2x.

Example image files:
icon.png    (15px x 15px @72ppi)
icon@2x.png (30px x 30px @72ppi)

command: gulp sprite:images
dependencies: gulp.spritesmith vinyl-buffer merge-stream gulp-imagemin8
========================================================================== */
gulp.task('sprite:images', () => {
  // Generate our spritesheet
  var spriteData = gulp.src('src/media/sprite-img/*.png').pipe(spritesmith({
    retinaSrcFilter: ['src/media/sprite-img/*@2x.png'],
    imgName: 'sprite.png',
    retinaImgName: 'sprite@2x.png',
    cssName: '_gulp-spritesmith.scss'
  }));
  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imageMin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(BUILD_PATH + '/assets/img'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(size({ title: 'SPRITE:IMAGES'}))
    .pipe(gulp.dest('src/scss/sprites/'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

// SPRITES:SVG (.svg) --------------------------------
gulp.task('sprite:svg', () => {

  return gulp.src(['src/media/sprite-svg/**/*'])
    .pipe(size({ title: 'SPRITE:SVG'}))
    .pipe(svgmin())
    .pipe(svgstore({
      fileName: 'sprite.svg',
      inlineSvg: false
    }))
    .pipe(cheerio({
      run: function ($, file) {
        //$('svg').addClass('hide');
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: true
      },
      plugins: [{
        cleanupIDs: {
            minify: false
        }
      }]
    }))
    // .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(BUILD_PATH + '/assets/img'));
});
/* ==========================================================================
PAGES/TEMPLATES
========================================================================== */

/*
templating with zurb's panini
Docs: http://foundation.zurb.com/sites/docs/panini.html
Repo: https://github.com/zurb/panini
========================================================================== */
gulp.task('pages', () => {
  return gulp.src('src/templates/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/templates/pages/',
      layouts: 'src/templates/layouts/',
      partials: 'src/templates/partials/',
      helpers: 'src/templates/helpers/',
      data: 'src/templates/data/'
    }))
    .pipe(gulp.dest(BUILD_PATH))
});

function pagesReset(done) {
  panini.refresh();
  done();
}

gulp.task('pages:reset', pagesReset);

// gulp.task('pages:build'), function() {
//   runSequence('pages:reset', 'pages');
// }

/* ==========================================================================
WATCH
========================================================================== */
gulp.task('watch', () => {
  gulp.watch('src/scss/**/*', ['styles']);
  gulp.watch('src/media/img/**/*', ['images']);
  gulp.watch('src/media/svg/**/*', ['svg']);
  gulp.watch('src/media/sprites-img/**/*', ['sprite:images']);
  gulp.watch('src/media/sprites-svg/**/*', ['sprite:svg']);
  gulp.watch([
      'src/js/modules/**/*',
      'src/js/vendor/**/*',
      '!src/js/vendor/copy/**/*',
      'src/js/main.js'
    ], () => {
      runSequence('scripts', reload);
    }
  );
  gulp.watch(['src/js/vendor/copy/**/*'], () => {
      runSequence('scripts:vendor:copy', reload);
    }
  );
  gulp.watch('src/templates/pages/**/*', () => {
    runSequence('pages:reset', 'pages', reload);
  });
  gulp.watch(['src/templates/{layouts,partials,helpers,data}/**/*'], () => {
    runSequence('pages:reset', 'pages', reload);
  });

});





// The default task when we run `gulp` for doing development
gulp.task('default', () => {
  runSequence(
    'clean',
    'env:dev',
    [
      'images',
      'svg',
      'sprite:images',
      'sprite:svg',
      'styles',
      'scripts',
      'scripts:vendor:copy',
      'pages'
    ],
    'serve',
    'watch'
  );
});

gulp.task('build', () => {
  runSequence(
    'clean',
    'env:prod',
    [
      'images',
      'svg',
      'sprite:images',
      'sprite:svg',
      'styles',
      'scripts',
      'scripts:vendor:copy',
      'pages'
    ]
  );
});
