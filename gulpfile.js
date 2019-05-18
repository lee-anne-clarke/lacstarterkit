var gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

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

gulp.task('serve', gulp.series('compile-sass', 'compile-js', function(done) { 
	browserSync.init({
		server: './dist'
	});

	gulp.watch(paths.styles.srcWatch, gulp.series('compile-sass'));
	gulp.watch(paths.scripts.src, gulp.series('compile-js'));
	gulp.watch('dist/**/*.html').on('change', browserSync.reload);

	done();
}));

gulp.task('default', gulp.series('serve'));