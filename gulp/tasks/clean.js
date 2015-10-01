'use strict';

var gulp = require('gulp');
var config = require('../tasks.config.json');

var del = require('del');
var cache = require('gulp-cache');

gulp.task('clean', function(callback){
  del(config.server.root + '/**/*', callback);
  return cache.clearAll(callback);
});