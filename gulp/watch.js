'use strict'; /*jslint node: true */

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();



/* --------------------------------------- */
/* WATCH TASK                              */

/* Checks If any changes to SASS files     */
/* via compass and If so runs task STYLES  */
/* It also runs the SERVE task             */
/* --------------------------------------- */

gulp.task('watch',['run_server'], function () {

    gulp.watch('app/sass/**/*', ['styles']);

});

/* --------------------------------------- */
/* STYLES TASK */

/* It compiles the css using compass       */
/* --------------------------------------- */

gulp.task('styles', function () {
  console.log("======= > STYLES TASK"); 
  return gulp.src(['app/sass/**/*.scss'])
    .pipe($.compass({
      css: 'app/css',
      sass: 'app/sass'
    })).pipe(gulp.dest('.tmp/styles'));
});





