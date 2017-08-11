"use strict";

const gulp = require('gulp');

/** RoyalRanger */
gulp.task('rr:sass', require('./royalrangers/gulpfile.js').sass);
gulp.task('rr:sass:watch', require('./royalrangers/gulpfile.js').sassWatch);
gulp.task('rr:js', require('./royalrangers/gulpfile').js);
gulp.task('rr:js:watch', require('./royalrangers/gulpfile').jsWatch);
