var gulp = require('gulp');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uncss = require('gulp-uncss');
var csso = require('gulp-csso');
var typogr = require('gulp-typogr');
var concat = require('gulp-concat');

gulp.task('default', ['build-theme']);

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
    .pipe(gulp.dest('./src/css'));
  var compressed = gulp.src('./src/stylesheets/*.scss')
    .pipe(sass())
    .pipe(uncss({
        html: ['./dist/**/*.html']
    }))
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
