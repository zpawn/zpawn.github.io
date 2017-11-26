"use strict";

const browserSync = require('browser-sync');

exports.serv = function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
};