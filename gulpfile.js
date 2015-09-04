//Base Utils
var gulp = require('gulp');
var merge = require('merge-stream');
var del = require('del');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
// Sass / CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');
var csso = require('gulp-csso');
// HTML
var typogr = require('gulp-typogr');

gulp.task('default', ['build-theme']);

gulp.task('clean', function() {
  del('./dist');
});

gulp.task('typo', function() {
  return gulp.src('./src/*.html')
    .pipe(typogr({
      only: ['amp', 'widont', 'smartypants']
    }))
    .pipe(gulp.dest('./dist/html/'));
});

gulp.task('sass', ['typo'], function() {
  var nested = gulp.src('./src/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'nested'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'));
  var compressed = gulp.src('./src/stylesheets/*.scss')
    .pipe(sass())
    //.pipe(uncss({
    //    html: ['./dist/**/*.html']
    //}))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename(function(path) {
      path.basename += '.min';
      path.extname = '.css';
    }))
    .pipe(gulp.dest('./dist/css'));
  return merge(nested, compressed);
});

gulp.task('build-theme', ['typo', 'sass'], function() {
  return gulp.src(['./dist/html/head.html', './dist/css/main.min.css', './dist/html/svg.html', './dist/html/body.html'])
    .pipe(concat('theme.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['build-theme'], function () {
  gulp.watch(['./src/stylesheets/*.scss', './src/stylesheets/**/*.scss', './src/*.html'], ['build-theme']);
});
