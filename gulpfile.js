// Base Utils
var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var include = require('gulp-file-include');
// Sass / CSS
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var autoprefixer = require('gulp-autoprefixer');
var cmq = require('gulp-combine-media-queries');
var csso = require('gulp-csso');
// Coffeescript / Javascript
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');

var paths = {
  src: 'src',
  dist: 'dist',

  sass: 'src/stylesheets/*.scss',
  sassPath: 'src/stylesheets',
  css: 'src/templates/assets/**/*.css',

  coffee: 'src/scripts/**/*.coffee',
  coffeePath: 'src/scripts',
  js: 'src/templates/assets/**/*.js',

  templates: 'src/templates/*.html',
  templatesPath: 'src/templates/',
  partials: 'src/templates/partials/**/*.html',
  partialsPath: 'src/templates/partials',
  assets: 'src/templates/assets/**/*.+{js|css}',
  assetsPath: 'src/templates/assets'
}

gulp.task('default', ['html']);

// Sass / CSS

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass({ includePaths: neat }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cmq())
    .pipe(csso())
    .pipe(gulp.dest(paths.assetsPath));
});

gulp.task('sass:debug', function() {
  return gulp.src(paths.sass)
    .pipe(sass({
      outputStyle: 'nested',
      includePaths: neat
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cmq())
    .pipe(gulp.dest(paths.assetsPath));
});

// Coffee / Javascript

gulp.task('coffee', function() {
  return gulp.src(paths.coffee)
    .pipe(coffee({
      bare:true
    }))
    // Uglify is being fucking dumb atm
    // .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.assetsPath));
});

gulp.task('coffee:debug', function() {
  return gulp.src(paths.coffee)
    .pipe(coffee({
      bare: true
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.assetsPath));
});

// HTML

gulp.task('html', ['sass', 'coffee'], function() {
  return gulp.src(paths.templates)
    .pipe(include({
      prefix: '@@',
      basepath: paths.partialsPath
    }))
    .pipe(include({
      prefix: '##',
      basepath: paths.assetsPath
    }))
    .pipe(gulp.dest(paths.dist));
});

// Clean

gulp.task('clean', function() {
  del(paths.dist);
});

gulp.task('clean:css', function() {
  del(paths.css);
});

gulp.task('clean:js', function() {
  del(paths.js);
});

gulp.task('clean:assets', function() {
  del(paths.assetsPath);
});

// Watch

gulp.task('watch', ['html'], function () {
  gulp.watch('./src/**/*.+{scss|html|coffee}', ['html']);
});
