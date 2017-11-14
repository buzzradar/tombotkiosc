'use strict'; /*jslint node: true */

var gulp = require('gulp');

var browserSync = require('browser-sync');

/* --------------------------------------- */
/* SERVE TASK                              */

/* Task that creates a local server using  */
/* Browsery Sync. If dev/bundle.js or CSS  */
/* changes It will refresh the Browser     */
/* --------------------------------------- */

gulp.task('run_server', function () {

  var files = [
     'app/**/*.js',
     'app/*.html',
     'app/css/*.css',
     'app/img/*.*',
  ];



	browserSync.init(files, {

      //proxy: "localhost", // use with e.g. mamp

      server: {
         baseDir: './app/'
      },
      port: 1111,

      browser: ["Google Chrome"]
      //tunnel: "buzzradar",


   });

});