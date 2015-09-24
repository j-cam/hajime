'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');

var browserSync = require('browser-sync').create();


gulp.task('serve', function () {

  return browserSync.init({

    server: {

      baseDir: config.server.root

    },

    port: config.server.port,
    proxy: config.server.proxy,
    directory: false,
    injectChanges: true,
    files: config.server.files,
    open: config.server.open

  });

});

gulp.task('serve:reload', function(browserSync){
  browserSync.reload;
});


