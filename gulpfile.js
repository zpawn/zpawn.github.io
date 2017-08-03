"use strict";

const gulp = require('gulp');

/** RoyalRanger */
gulp.task('rr:sass', require('./royalranger/gulpfile.js').sass);
gulp.task('rr:sass:watch', require('./royalranger/gulpfile.js').sassWatch);
gulp.task('rr:js', require('./royalranger/gulpfile').js);
