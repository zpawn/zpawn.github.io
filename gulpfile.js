"use strict";

const gulp = require('gulp');

/** Maps */
gulp.task('m:sass', require('./maps/gulpfile').sass);
gulp.task('m:sass:watch', require('./maps/gulpfile').sassWatch);
gulp.task('m:js', require('./maps/gulpfile').js);
gulp.task('m:js:watch', require('./maps/gulpfile').jsWatch);
gulp.task('m', gulp.series(gulp.parallel('m:sass', 'm:js')));
