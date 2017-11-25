'use strict';

const gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),

    gulpif = require('gulp-if'),
    arg = require('yargs')
        .alias('d', 'dev')
        .argv,

    config = {
        app: {
            src: [
                './src/js/core/**/*.js',
                './src/js/*.class.js',
                './src/js/*.js',
                './src/js/app.js'
            ],
            destFile: 'app.js',
            dest: './dist/js/.'
        },

        dep: {
            src: [
                './node_modules/jquery/dist/jquery.js',
                './node_modules/popper.js/dist/umd/popper.js',
                './node_modules/bootstrap/dist/js/bootstrap.js',
                './node_modules/lodash/lodash.js',
                './node_modules/moment/min/moment-with-locales.js',
                './node_modules/perfect-scrollbar/dist/perfect-scrollbar.js',
                './node_modules/anypicker/dist/anypicker.js'
            ],
            destFile: 'dep.js',
            dest: './dist/js/.'
        },

        sourcemaps: {
            loadMaps: true,
            largeFile: true
        },
        plumber: {
            errorHandler: notify()
        },
    },

    tasks = {
        dependencies: dependencies,
        js: js,
        jsWatch: jsWatch
    };

module.exports = tasks;

function js () {
    return gulp.src(config.app.src)
        .pipe(plumber(config.plumber))
        .pipe(
            gulpif(arg.dev, sourcemaps.init(config.sourcemaps))
        )
        // .pipe(rename({
        //     dirname: ''
        // }))
        .pipe(babel())
        .pipe(concat(config.app.destFile))
        .pipe(
            gulpif(arg.dev, sourcemaps.write())
        )
        .pipe(
            gulpif(!arg.dev, uglify())
        )
        .pipe(gulp.dest(config.app.dest))
}

function jsWatch () {
    arg.dev = true;
    return js();
}

function dependencies () {
    return gulp
        .src(config.dep.src)
        .pipe(
            gulpif(arg.dev, sourcemaps.init(config.sourcemaps))
        )
        .pipe(rename({
            dirname: ''
        }))
        .pipe(concat(config.dep.destFile))
        .pipe(
            gulpif(arg.dev, sourcemaps.write())
        )
        .pipe(
            gulpif(!arg.dev, uglify())
        )
        .pipe(gulp.dest(config.dep.dest))
}