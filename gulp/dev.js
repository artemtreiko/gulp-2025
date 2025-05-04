import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const webpackConfig = require('../webpack.config.cjs');
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
const sass = gulpSass(dartSass);

import browserSync from 'browser-sync';
import fs from 'fs';
import sourceMaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import webpack from 'webpack-stream';
import babel from 'gulp-babel';
const del = await import('del');
import svgSprite from 'gulp-svg-sprite'

const bs = browserSync.create();

// Функція для спостереження за змінами та перезавантаження браузера
const watchAndReload = (path, task) => {
  console.log(`watchAndReload path: ${path}`);
  return gulp.watch(path, { usePolling: true }, gulp.series(task, (done) => {
    console.log(`Reloading browser for ${path}`);
    bs.reload();
    done();
  }));
};

// Налаштування для gulp-file-include
const fileInclueSettings = {
  prefix: '@@',
  basePath: '@file',
};

// Обробка помилок через plumber
const plumberNotify = (title) => {
  return {
    errorHandler: (err) => {
      console.error(`${title} Error: ${err.message}`);
      this.emit('end');
    },
  };
};

// Очищення папки build перед білдом
gulp.task('clean:dev', function (done) {
  del.deleteAsync(['./build/**/*']).then(() => done());
});

// Очищення папки зображень
gulp.task('clean:images', function (done) {
  del.deleteAsync(['build/img/**/*']).then(() => done());
});

// Обробка HTML
gulp.task('html:dev', function (done) {
  gulp
    .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileInclueSettings))
    .pipe(gulp.dest('./build/'))
    .on('end', done);
});

// Обробка SCSS
gulp.task('sass:dev', function (done) {
  if (!fs.existsSync('./build/css/')) {
    fs.mkdirSync('./build/css/', { recursive: true });
  }
  gulp
    .src('./src/scss/*.scss')
    .pipe(plumber(plumberNotify('SCSS')))
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', function (err) {
      console.error('Sass error:', err.message);
      this.emit('end');
    }))
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./build/css/'))
    .on('end', done);
});

// Копіювання зображень
gulp.task('images:copy', function (done) {
  gulp
    .src('./src/img/**/*.{png,jpg,jpeg,svg}', { encoding: false })
    .pipe(gulp.dest('./build/img/'))
    .on('end', done);
});

gulp.task('images:dev', gulp.series('clean:images', 'images:copy'));

gulp.task('sprite:dev', function (done) {
  gulp
    .src('./src/img/svg/*.svg')
    .pipe(plumber(plumberNotify('SVG Sprite')))
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '.', // Вихідна папка відносно gulp.dest
          sprite: 'sprite.svg', // Ім’я спрайту
        },
      },
    }))
    .pipe(gulp.dest('./build/img/'))
    .on('end', done);
});

// Копіювання шрифтів
gulp.task('fonts:dev', function (done) {
  gulp
    .src('./src/fonts/**/*', { encoding: false })
    .pipe(gulp.dest('./build/fonts/'))
    .on('end', done);
});

// Копіювання файлів
gulp.task('files:dev', function (done) {
  gulp
    .src('./src/files/**/*')
    .pipe(gulp.dest('./build/files/'))
    .on('end', done);
});

// Обробка JavaScript
gulp.task('js:dev', function (done) {
  gulp
    .src('./src/js/*.js')
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./build/js/'))
    .on('end', done);
});

// Запуск локального сервера
gulp.task('server:dev', function (done) {
  bs.init({
    server: './build/',
    port: 8000,
    open: true,
    notify: false,
  }, done);
});

// Спостереження за змінами
gulp.task('watch:dev', function () {
  console.log('Starting watch:dev');

  // SCSS із live reload без перезавантаження
  gulp.watch('./src/scss/**/*.scss', { usePolling: true }, function scssWatcher() {
    return gulp
      .src('./src/scss/*.scss')
      .pipe(plumber(plumberNotify('SCSS')))
      .pipe(sourceMaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCss())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('./build/css/'))
      .pipe(bs.stream());
  });

  watchAndReload('./src/**/*.html', 'html:dev');
  watchAndReload('./src/img/**/*', 'images:dev');
  watchAndReload('./src/fonts/**/*', 'fonts:dev');
  watchAndReload('./src/files/**/*', 'files:dev');
  watchAndReload('./src/js/**/*.js', 'js:dev');
});

// Основне завдання для розробки
gulp.task('dev',
  gulp.series(
    'clean:dev',
    gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
    'server:dev',
    'watch:dev'
  )
);