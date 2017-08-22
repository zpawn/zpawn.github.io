"use strict";

const gulp = require('gulp');

/** RoyalRanger */
gulp.task('rr:sass', require('./royalrangers/gulpfile').sass);
gulp.task('rr:sass:watch', require('./royalrangers/gulpfile').sassWatch);
gulp.task('rr:js', require('./royalrangers/gulpfile').js);
gulp.task('rr:js:watch', require('./royalrangers/gulpfile').jsWatch);
gulp.task('rr', gulp.series(gulp.parallel('rr:sass', 'rr:js')));
gulp.task('rr:watch', gulp.series(gulp.parallel('rr:sass:watch', 'rr:js:watch')));

/** Maps */
gulp.task('m:sass', require('./maps/gulpfile').sass);
gulp.task('m:sass:watch', require('./maps/gulpfile').sassWatch);
gulp.task('m:js', require('./maps/gulpfile').js);
gulp.task('m:js:watch', require('./maps/gulpfile').jsWatch);
gulp.task('m', gulp.series(gulp.parallel('m:sass', 'm:js')));
