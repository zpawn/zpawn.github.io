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
                src: 'royalrangers/src/scss/landing.scss',
                dest: 'royalrangers/dist/.',
                watch: 'royalrangers/src/scss/**/*.scss'
            },
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'royalrangers/src/js/instance/*.js',
                    'royalrangers/src/js/*.js'
                ],
                dest: 'royalrangers/dist/.'
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
    gulp.watch(config.path.sass.watch, gulp.series('rr:sass'));
};

exports.js = function () {
    return gulp.src(config.path.js.src)
        .pipe(sourcemaps.init())
        .pipe(rename({dirname: ''}))
        .on('error', function(e) {
            console.log('>>> ERROR', e.message);
            this.emit('end');
        })
        .pipe(concat('landing.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.path.js.dest));
};

exports.jsWatch = function () {
    gulp.watch(config.path.js.src, gulp.series('rr:js'));
};