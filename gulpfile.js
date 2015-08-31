var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var typogr = require('gulp-typogr');
var concat = require('gulp-concat');

gulp.task('default', ['build-theme']);

gulp.task('sass', function() {
  return gulp.src('./src/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('min-css', ['sass'], function() {
  return gulp.src('./src/css/*.css')
    .pipe(rename(function(path) {
      path.basename += '.min';
      path.extname = '.css';
    }))
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('typo', function() {
  return gulp.src('./src/*.html')
    .pipe(typogr({
      only: ['amp', 'widont', 'smartypants']
    }))
    .pipe(gulp.dest('./dist/html/'));
});

gulp.task('build-theme', ['min-css', 'typo'], function() {
  return gulp.src(['./dist/html/head.html', './dist/css/main.min.css', './dist/html/svg.html', './dist/html/body.html'])
    .pipe(concat('theme.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/stylesheets/*.scss', './src/stylesheets/**/*.scss', './src/*.html'], ['build-theme']);
});
