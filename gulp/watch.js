'use strict'; /*jslint node: true */

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var merge = require('gulp-merge');
var concat = require('gulp-concat');
var html2js = require('gulp-html-js-template');






/* --------------------------------------- */
/* WATCH TASK                              */

/* Checks If any changes to SASS files     */
/* via compass and If so runs task STYLES  */
/* It also runs the SERVE task             */
/* --------------------------------------- */

gulp.task('watch',['run_server'], function () {

    gulp.watch('app/sass/**/*', ['styles']);
    gulp.watch('app/tpl/**/*', ['templatetojs','templatetomodule']);

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



/* --------------------------------------- */
/* TEMPLATESTOJS TASK */
/* Turns TEMPLATES into JS file            */
/* Turns the template into a Require Module*/                           
/* 1- Turns de template into a single line*/                           
/* 2- Contacts the line and the module to */                           
/* create a REQUIRE module. HBTemplates-srv */                           
/* --------------------------------------- */

gulp.task('templatetojs', function () {
  
  	console.log("======= > TEMPLATE TO JS TASK");  
	return gulp.src( 'app/tpl/HandlebarTemplates.html' )
	.pipe( html2js() )
	.pipe( gulp.dest( 'app/tpl/' ) );   

});

gulp.task('templatetomodule', function () {
  
    console.log("======= > TEMPLATE TO MODULE");  
  return gulp.src( ['app/tpl/HandlebarTemplates.js','app/tpl/HBTemplates-Module.js'] )
    .pipe(concat('HBTemplates-srv.js'))
    .pipe( gulp.dest( 'app/src/services/' ) ); 
            

});

