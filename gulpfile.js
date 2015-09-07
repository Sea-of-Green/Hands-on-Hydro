// Base Utils
var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
// Sass / CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');
var csso = require('gulp-csso');
var neat = require('node-neat');
// HTML
var typogr = require('gulp-typogr');

gulp.task('default', ['build']);

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
  return gulp.src('./src/stylesheets/*.scss')
    .pipe(sass({ includePaths: neat.includePaths }))
    .pipe(sass().on('error', sass.logError))
    //.pipe(uncss({
    //  html: ['./dist/**/*.html']
    //}))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:debug', ['typo'], function() {
  return gulp.src('./src/stylesheets/*.scss')
    .pipe(sass({
      outputStyle: 'nested',
      includePaths: neat.includePaths
    }))
    .pipe(sass().on('error', sass.logError))
    //.pipe(uncss({
    //  html: ['./dist/**/*.html']
    //}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build', ['typo', 'sass'], function() {
  return gulp.src(['./dist/html/head.html', './dist/css/main.css', './dist/html/svg.html', './dist/html/body.html'])
    .pipe(concat('theme.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['build'], function () {
  gulp.watch(['./src/stylesheets/*.scss', './src/stylesheets/**/*.scss', './src/*.html'], ['build']);
});
