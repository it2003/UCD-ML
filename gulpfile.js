/*
 * gulp
 * devDependencies included in package.json
 * npm install to get started
 */

'use strict';

// Load plugins
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	del = require('del'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect');


// Styles
gulp.task('styles', function() {
	return gulp.src([
		'Sass/global.scss'
	])
	.pipe(plumber({
		errorHandler: function (err) {
			console.log(err);
			notify.onError({
				message: 'Error in styles task: <%= error.message %>',
				sound: false
			})(err);
			this.emit('end');
		}
	}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(gulp.dest('css'))
	// .pipe(connect.reload())
	.pipe(rename({ suffix: '.min' }))
	.pipe(cssnano({ zindex: false, reduceIdents: false }))
	.pipe(autoprefixer('last 2 version'))
	.pipe(gulp.dest('css'))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('css'))
	.pipe(livereload())
	.pipe(notify({ message: 'Styles task completed', onLast: true }));

});

gulp.task('watch', function() {
	// livereload.listen({ basePath: 'css' });
	livereload.listen();
	// Watch .scss files
	gulp.watch('Sass/**/*.scss', ['styles']);
});


gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

// Default - runs the scripts, styles and watch tasks: 'gulp' will run this task
gulp.task('default', ['styles', 'watch', 'webserver']);
