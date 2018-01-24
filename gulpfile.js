var gulp = require('gulp'); 
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function() {
  return gulp.src('./build', { read: false })
    .pipe(clean());
});

gulp.task('scripts', function() {
  return gulp.src('./src/**/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['clean', 'lint', 'scripts']);
});

gulp.task('build', [ 'clean', 'lint', 'scripts', 'watch' ]);