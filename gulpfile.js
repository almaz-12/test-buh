const {src, dest, watch, parallel, series} = require('gulp');


const scss = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');

function scripts() {
  const modules = [
    'node_modules/swiper/swiper-bundle.js',
    'src/js/main.js'
  ];
  return src(modules)
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('src/js'))
  .pipe(browserSync.stream());
}

function styles() {
  const modules = [
    'src/scss/*.scss'
  ];
  return src(modules)
  .pipe(plumber())
  .pipe(concat('main.min.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 version']
  }))
  .pipe(sourcemaps.init())
  .pipe(scss({outputStyle: 'compressed'}))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('src/css'))
  .pipe(browserSync.stream());
}


function images() {
  return src('src/assets/images/src/*.*')
    .pipe(newer('src/assets/images/'))
    .pipe(webp())

    .pipe(src('src/assets/images/src/*.*'))
    .pipe(newer('src/assets/images/'))
    .pipe(imagemin())
    .pipe(dest('src/assets/images/'))
}

function watching() {
  browserSync.init({
      server: {
          baseDir: "src/"
      }
  });
  watch(['src/scss/**/*.scss'], styles)
  watch(['src/js/main.js'], scripts)
  watch(['src/assets/images/src'], images)
  watch(['src/*.html']).on('change', browserSync.reload)
}

function build() {
  return src([
    'src/**/*.html',
    'src/css/*.css',
    'src/js/*.js',
    'src/assets/**',
    '!src/assets/images/src/**',
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
exports.images = images;

exports.build = series(cleanDist, build);
exports.default = parallel(styles, scripts, watching);