// Requiring Gulp
var gulp = require('gulp');
var runSequence = require('run-sequence');
//var config = require('./tasks.config.json');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp/tasks', { recurse:true } );


gulp.task('default', function()
{
    runSequence(
        [
        'scripts',
        'styles',
        'templates',
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
        'clean',
        [
        'scripts',
        'styles',
        'templates',
        'images',
        'fonts'
        ]
    );
});