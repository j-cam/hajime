// Requiring Gulp
var gulp = require('gulp');
var size = require('gulp-size');
var runSequence = require('run-sequence');
//var config = require('./tasks.config.json');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp/tasks', { recurse:true } );


gulp.task('default', function()
{
    runSequence(
        [

        'templates',
        'scripts',
        'scripts:copy',
        'styles',
        'images',
        'fonts'
        ],
        'watch',
        'serve'
    );
});


gulp.task('build', function()
{
    runSequence(
        [
        'templates',
        'scripts',
        'scripts:copy',
        'styles',
        'images',
        'fonts'
        ]
    );
});