"use strict";

const gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('serv', () => {
    browserSync.init({
        server: {
            baseDir: "../"
        }
    });
});
