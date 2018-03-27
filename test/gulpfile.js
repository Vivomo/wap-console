let gulp = require('gulp'),
    scss = require('gulp-sass'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    es6Path = './script/**/*.js',
    es5Path = './js',
    cssPath = './css',
    scssSrc = './scss/**/*.scss';

let browserSync = require("browser-sync").create();


gulp.task('browser', function () {

    browserSync.init({
        files: ['./**/*.html'],
        server: {
            baseDir: ["./"],
            index: "./test.html",
        },
        notify: false,
        host: "192.168.20.105"
    });
});


gulp.task('scss', function () {
    gulp.src(scssSrc)
        .pipe(scss({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(cssPath));
});

gulp.task('babel', function () {
    gulp.src(es6Path)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest(es5Path));
});

gulp.task('build', function () {
    gulp.src(es6Path)
        .pipe(gulp.dest('../src'));

    gulp.src(es6Path)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('wapConsole.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../src'));
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('watch', function () {
    gulp.watch(scssSrc, ['scss', 'reload']);
    gulp.watch(es6Path, ['babel', 'reload']);
});

gulp.task('default', ['scss', 'babel','watch', 'browser']);