const {src, dest, watch, parallel, series} = require('gulp');


const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

function scripts() {
  return src('src/js/main.js')
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('src/js'))
  .pipe(browserSync.stream());
}

function styles() {
  return src('src/scss/*.scss')
  .pipe(concat('main.min.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 version']
  }))
  .pipe(scss({outputStyle: 'compressed'}))
  .pipe(dest('src/css'))
  .pipe(browserSync.stream());
}

function imagesToAvif() {
  return src(['src/assets/images/src/*.*', '!src/assets/images/src/*.svg'])
    .pipe(newer('src/assets/images/dist'))
    .pipe(avif({quality : 50}))
    .pipe(dest('src/assets/images/dist'))
}

function imagesToWebp() {
  return src('src/assets/images/src/*.*')
    .pipe(newer('src/assets/images/dist'))
    .pipe(webp())
    .pipe(dest('src/assets/images/dist'))
}

function imagesMin() {
  return src('src/assets/images/src/*.*')
    .pipe(newer('src/assets/images/dist'))
    .pipe(imagemin())
    .pipe(dest('src/assets/images/dist'))
}

function watching() {
    browserSync.init({
      server: {
          baseDir: "src/"
      }
  });
  watch(['src/scss/**/*.scss'], styles)
  watch(['src/js/main.js'], scripts)
  watch(['src/*.html']).on('change', browserSync.reload)
}

function build() {
  return src([
    'src/**/*.html',
    'src/css/*.css',
    'src/js/*.js',
    'src/assets/**',
  ], {base : 'src'})
  .pipe(dest('dist'));
}

function cleanDist() {
  return src('dist')
    .pipe(clean())
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.build = build;

exports.build = series(cleanDist, build);
exports.default = parallel(styles, scripts, watching);
exports.images = parallel(imagesToAvif, imagesToWebp, imagesMin);