import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import args from './util/args';
import base64 from 'gulp-base64';
import rename from 'gulp-rename';

gulp.task('style', () => {
  gulp.src(['app/css/index.sass'])
    .pipe(plumber({
      errorHandle: function () {
      }
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(base64({
      extensions: ['svg', 'png', /\.jpg#datauri$/i],
      maxImageSize: 8 * 1024, // bytes
      debug: true
    }))
    .pipe(autoprefixer({
      browsers: ['>1%'],
      cascade: false,
      remove: false
    }))
    .pipe(gulp.dest('server/public/css'))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      basename: 'index',
      extname: '.min.css'
    }))
    
    .pipe(gulp.dest('server/public/css'))
    .pipe(gulpif(args.watch, livereload()))
    .pipe(gulpif(args.build, gulp.dest('build/css')))

  gulp.src('app/css/font/**/*')
    .pipe(gulpif(args.watch, gulp.dest('server/public/css/font')))
    .pipe(gulpif(args.build, gulp.dest('build/css/font')))
})