"use strict";

const $ = require('gulp-load-plugins')(),
    gulp = require('gulp'),

    browserSync = require('browser-sync').create(),

    arg = require('yargs')
        .alias('d', 'dev')
        .argv,

    config = {
        path: {
            sass: {
                src: 'src/scss/landing.scss',
                dest: 'dist/.',
                watch: 'src/scss/**/*.scss'
            },
            js: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/material-design-lite/src/mdlComponentHandler.js',
                    'node_modules/material-design-lite/src/textfield/textfield.js',
                    'src/js/instance/*.js',
                    'src/js/*.js'
                ],
                dest: 'dist/.'
            }
        },
        browser: ["last 2 versions"],
        csso: {
            comments: false,
            sourceMap: false
        }
    };


gulp.task('sass', function () {
    return gulp
        .src(config.path.sass.src)
        .pipe(
            $.if(arg.dev, $.sourcemaps.init())
        )
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe(
            $.if(arg.dev, $.sourcemaps.write())
        )
        .pipe(
            $.if(!arg.dev, $.csso(config.csso))
        )
        .pipe(gulp.dest(config.path.sass.dest));
});

gulp.task('sass:watch', function () {
    arg.dev = true;
    gulp.watch(config.path.sass.watch, gulp.series('sass'));
});

gulp.task('js', function () {
    return gulp
        .src(config.path.js.src)
        .pipe($.if(arg.dev, $.sourcemaps.init()))
        .pipe($.rename({dirname: ''}))
        .on('error', function(e) {
            console.log('>>> ERROR', e.message);
            this.emit('end');
        })
        .pipe($.concat('landing.js'))
        .pipe($.if(arg.dev, $.sourcemaps.write()))
        .pipe($.if(!arg.dev, $.uglify()))
        .pipe(gulp.dest(config.path.js.dest));
});

gulp.task('js:watch', function () {
    gulp.watch(config.path.js.src, gulp.series('js'));
});

gulp.task('default', gulp.series(gulp.parallel('sass', 'js')));
gulp.task('watch', gulp.series(gulp.parallel('sass:watch', 'js:watch')));

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
