"use strict";

const $ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    arg = require('yargs')
        .alias('d', 'dev')
        .argv,

    config = {
        src: './src/scss',
        dest: './dist/.',
        autoprefixer: {
            browsers: [ "last 2 versions" ]
        },
        csso: {
            comments: false,
            sourceMap: false
        },

        plumber: {
            errorHandler: $.notify.onError(function (err) {
                return {
                    title: 'Gulp Task Error',
                    message: err.message
                }
            })
        }
    };

gulp.task('sass:dep', () => {
    return gulp
        .src(config.src + '/dep.scss')
        .pipe($.plumber(config.plumber))
        .pipe($.sass())
        .pipe($.csso(config.csso))
        .pipe(gulp.dest(config.dest));
});

gulp.task('sass', () => {
    return gulp
        .src(config.src + '/app.scss')
        .pipe($.plumber(config.plumber))
        .pipe($.if(arg.dev, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.if(arg.dev, $.sourcemaps.write()))
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe($.if(!arg.dev, $.csso(config.csso)))
        .pipe(gulp.dest(config.dest));
});

gulp.task('default', gulp.parallel('sass', 'sass:dep'));

gulp.task('sass:watch', function () {
    arg.dev = true;
    gulp.watch(`${config.src}/**/*.scss`, gulp.parallel('sass', 'sass:dep'));
});
