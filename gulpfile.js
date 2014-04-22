var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat');

function js(prefix) {
	gulp.src('src/clockpicker.js')
		.pipe(rename({
			prefix: prefix + '-'
		}))
		.pipe(gulp.dest('dist'))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist'));
}

function css(prefix) {
	var stream;
	if (prefix === 'bootstrap') {
		stream = gulp.src('src/clockpicker.css');
	} else {
		stream = gulp.src(['src/standalone.css', 'src/clockpicker.css'])
			.pipe(concat('clockpicker.css'));
	}
	stream.pipe(rename({
			prefix: prefix + '-'
		}))
		.pipe(gulp.dest('dist'))
		.pipe(minifyCSS({
			keepSpecialComments: 1
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist'));
}

gulp.task('js', function() {
	js('bootstrap');
	js('jquery');
});

gulp.task('css', function() {
	css('bootstrap');
	css('jquery');
});

gulp.task('watch', function() {
	gulp.watch('src/*.js', ['js']);
	gulp.watch('src/*.css', ['css']);
});

gulp.task('default', ['js', 'css', 'watch']);
