'use strict';
// Gulp Plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer');
// Gulp Config
var input = 'scss/**/*.scss',
    output = 'css',
    sassConfig = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    },
    autoprefixerConfig = {
        browsers: ['last 2 versions'],
        cascade: false
    }


// Run gulp task

gulp.task('sass', function () {
  gulp.src(input)
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerConfig))
    .pipe(gulp.dest(output))
    .pipe(livereload());
});

gulp.task('sass:watch', function () {
  livereload.listen();
  gulp.watch(input, ['sass']);
});

// Gulp default
gulp.task('default',['sass:watch']);