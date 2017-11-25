'use strict';

const gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    gulpif = require('gulp-if'),
    arg = require('yargs')
        .alias('d', 'dev')
        .argv,

    config = {
        src: [
            './src/scss/tag.manager.scss'
        ],
        dest: './dist/css/.',
        csso: {
            comments: false,
            sourceMap: false
        },
        autoprefixer: {
            browsers: [
                "last 2 versions"
            ]
        },
        plumber: {
            errorHandler: notify.onError((err) => {
                return {
                    title: 'Sass',
                    message: err.message
                }
            })
        },
        fonts: {
            src: [
                './src/fonts/*.*'
            ],
            dest: './dist/css/fonts/.'
        }
    },

    tasks = {
        sass: sass,
        sassWatch: sassWatch,
        fonts: fonts
    };

module.exports = tasks;

function sass () {
    return gulp.src(config.src)
        .pipe(plumber(config.plumber))
        .pipe(
            gulpif(arg.dev, sourcemaps.init())
        )
        .pipe(gulpSass())
        .pipe(
            gulpif(arg.dev, sourcemaps.write())
        )
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(
            gulpif(!arg.dev, csso(config.csso))
        )
        .pipe(gulp.dest(config.dest));
}

function sassWatch () {
    arg.dev = true;
    return sass();
}

function fonts () {
    return gulp
        .src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
}
