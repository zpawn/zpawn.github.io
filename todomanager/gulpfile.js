'use strict';

const gulp = require('gulp');

gulp.task('sass', require('./gulpfiles/styles').sass);
gulp.task('sass:watch', () => {
    gulp.watch('./src/scss/**/*.scss', require('./gulpfiles/styles').sassWatch);
});

gulp.task('fonts', require('./gulpfiles/styles').fonts);
gulp.task('js:dep', require('./gulpfiles/scripts').dependencies);
gulp.task('js:app', require('./gulpfiles/scripts').js);
gulp.task('js', gulp.parallel('js:dep', 'js:app'));
gulp.task('default', gulp.parallel('sass', 'fonts', 'js'));
gulp.task('js:watch', () => {
    gulp.watch('./src/js/**/*.js', require('./gulpfiles/scripts').jsWatch);
});
gulp.task('watch', gulp.parallel('sass:watch', 'js:watch'));
