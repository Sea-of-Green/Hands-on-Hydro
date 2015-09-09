// Base Utils
var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
// Sass / CSS
var sass = require('gulp-sass');
var neat = require('node-neat');
var autoprefixer = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');
var cmq = require('gulp-combine-media-queries');
var csso = require('gulp-csso');
// HTML
var typogr = require('gulp-typogr');

var neatPaths = neat.includePaths;
var ignoreRegEx = [/(\.post|\.text|\.photo|\.panorama|\.photoset|\.quote|\.link|\.chat|\.audio|\.video)/, /(\.post|\.text|\.photo|\.panorama|\.photoset|\.quote|\.link|\.chat|\.audio|\.video)+.+?(?=\s{)/];

gulp.task('default', ['clean', 'build'], function() {
  del(['./dist/html', './dist/css']);
});

gulp.task('clean', function() {
  del('./dist');
});

gulp.task('typo', function() {
  return gulp.src('./src/markup/*.html')
    .pipe(typogr({
      only: ['amp', 'widont', 'smartypants']
    }))
    .pipe(gulp.dest('./dist/html/'));
});

gulp.task('typo:debug', function() {
  return gulp.src('./src/markup/*.html')
    .pipe(gulp.dest('./dist/html/'));
});

gulp.task('sass', ['typo'], function() {
  return gulp.src('./src/stylesheets/*.scss')
    .pipe(sass({ includePaths: neatPaths }))
    .pipe(sass().on('error', sass.logError))
    .pipe(uncss({
      ignore: ignoreRegEx,
      html: ['./dist/**/*.html']
    }))
    .pipe(autoprefixer())
    .pipe(cmq())
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:debug', ['typo'], function() {
  return gulp.src('./src/stylesheets/*.scss')
    .pipe(sass({
      outputStyle: 'nested',
      includePaths: neatPaths
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(uncss({
      ignore: ignoreRegEx,
      html: ['./dist/**/*.html']
    }))
    .pipe(autoprefixer())
    .pipe(cmq())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build', ['sass'], function() {
  return gulp.src(['./dist/html/head.html', './dist/css/main.css', './dist/html/svg.html', './dist/html/body.html'])
    .pipe(concat('theme.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['build'], function () {
  gulp.watch(['./src/stylesheets/*.scss', './src/stylesheets/**/*.scss', './src/*.html'], ['build']);
});
