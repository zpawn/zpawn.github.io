"use strict";

var gulp = require('gulp'),

    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),

    rename = require('gulp-rename'),
    concat = require('gulp-concat'),

    gulpif = require('gulp-if'),
    arg = require('yargs')
        .alias('d', 'dev')
        .argv,

    config = {
        path: {
            sass: {
                src: 'maps/src/sass/maps.scss',
                dest: 'maps/dist/.',
                watch: 'maps/src/sass/**/*.scss'
            },
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery-placepicker/dist/js/jquery.placepicker.min.js',
                    'maps/src/js/**/*.js'
                ],
                dest: 'maps/dist/.'
            }
        },
        browser: ["last 2 versions"],
        csso: {
            comments: false,
            sourceMap: false
        }
    };

exports.sass = function () {

    return gulp.src(config.path.sass.src)
        .pipe(
            gulpif(arg.dev, sourcemaps.init())
        )
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(
            gulpif(arg.dev, sourcemaps.write())
        )
        .pipe(
            gulpif(!arg.dev, csso(config.csso))
        )
        .pipe(gulp.dest(config.path.sass.dest));
};

exports.sassWatch = function () {
    arg.dev = true;
    gulp.watch(config.path.sass.watch, gulp.series('m:sass'));
};

exports.js = function () {
    return gulp.src(config.path.js.src)
        .pipe(sourcemaps.init())
        .pipe(rename({dirname: ''}))
        .on('error', function(e) {
            console.log('>>> ERROR', e.message);
            this.emit('end');
        })
        .pipe(concat('maps.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.path.js.dest));
};

exports.jsWatch = function () {
    gulp.watch(config.path.js.src, gulp.series('m:js'));
};