var del = require('del'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    normalize = require('node-normalize-scss');

const SCRIPT_NAME = 'app.js',
      STYLE_NAME = 'app.css';

var paths = {
    src: {
        js: {
            files: './src/js/**/*.js'
        },
        sass: {
            files: './src/**/*.scss'
        }
    },
    dist: {
        js: './dist/js/',
        css: './dist/css/'
    }
};


gulp.task('build', ['sass', 'scripts']);

gulp.task('watch', () => {
    gulp.watch(paths.src.sass.files, ['sass']);
    gulp.watch(paths.src.js.files, ['scripts']);
});

/*
 * Concating and compressing all .scss files in main.css
 */
gulp.task('sass', () => {
    return gulp.src(paths.src.sass.files, {base: process.cwd()})
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: normalize.includePaths
        })
        .on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest(paths.dist.css));
});

/*
 * Prefixing css
 */
gulp.task('prefix', () => {
    gulp.src('./dist/css/' + STYLE_NAME)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.dist.css));
});

/*
 * Concating and compressing all .js files in main.js
 */
gulp.task('scripts', () => {
  return gulp.src(paths.src.js.files)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat(SCRIPT_NAME))
    .pipe(uglify({
        compress: {
            negate_iife: false
        }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist.js))
});

/*
 * Cleaning dist
 */
gulp.task('clean', () => {
    return del(['dist'])
});
