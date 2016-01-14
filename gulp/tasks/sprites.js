// 'use strict';

// var gulp = require('gulp');
// var size = require('gulp-size');
// var config = require('../tasks.config.json');

// var imageMin = require('gulp-imagemin');
// var spritesmith = require('gulp.spritesmith');
// var newer = require('gulp-newer');

// gulp.task('sprites', function () {

//     // Use all normal and `-2x` (retina) images as `src`
//     //   e.g. `github.png`, `github-2x.png`
//     var spriteData = gulp.src(config.sprites.filesSrc)

//     .pipe(spritesmith({

//       // Filter out `-2x` (retina) images to separate spritesheet
//       //   e.g. `github-2x.png`, `twitter-2x.png`
//       retinaSrcFilter: config.sprites.base + '*@2x.png',

//       // Generate a normal and a `-2x` (retina) spritesheet
//       imgName: 'spritesheet.png',
//       retinaImgName: 'spritesheet@2x.png',

//       // Image reference for generates css
//       imgPath: '../images/spritesheet.png',
//       retinaImgPath: '../images/spritesheet@2x.png',
//       // Padding in pixels between sprites
//       padding: 20,

//       // Generate SCSS variables/mixins for both spritesheets
//       cssName: '_gulp-spritesmith.css'

//     }));

//     // Deliver spritesheets to `dist/assets/images` folder as they are completed
//     spriteData.img.pipe(gulp.dest(config.images.dest));

//     // Deliver SCSS to `src` to be imported by 'style.scss'
//     spriteData.css.pipe(gulp.dest(config.sprites.sassDest));



//     //.pipe(newer(config.images.dest))
//     // .pipe(size({ title: 'images', showFiles: true }))
//     // Caching images that ran through imagemin
//     // .pipe(cache(imageMin({ interlaced: true, progressive: true })))
//     //.pipe(gulp.dest(config.images.dest))




// });