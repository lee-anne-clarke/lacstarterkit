var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var paths = {
	styles: {
	  src: 'src/scss/app.scss',
	  srcWatch: 'src/scss/**/*.scss',
	  dest: 'dist/css'
	},
	scripts: {
	  src: 'src/js/**/*.js',
	  dest: 'dist/js'
	}
};


gulp.task('compile-sass', function() {
	return gulp.src(paths.styles.src)
	  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	  .pipe(autoprefixer())
	  .pipe(gulp.dest(paths.styles.dest))
	  .pipe(browserSync.stream());
});

gulp.task('compile-js', function() {
  return gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.scripts.dest))
	  .pipe(browserSync.stream());
});

gulp.task('serve', ['compile-sass', 'compile-js'], function() { 
	browserSync.init({
		server: './dist'
	});

	gulp.watch(paths.styles.srcWatch, ['compile-sass']);
	gulp.watch(paths.scripts.src, ['compile-js']);
	gulp.watch('dist/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);