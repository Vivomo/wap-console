let gulp = require('gulp'),
    scss = require('gulp-sass'),
    babel = require('gulp-babel'),
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
        .pipe(scss())
        .pipe(gulp.dest(cssPath));
});

gulp.task('babel', function () {
    gulp.src(es6Path)
        .pipe(scss())
        .pipe(gulp.dest(es5Path));
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('watch', function () {
    gulp.watch(scssSrc, ['scss', 'reload']);
    gulp.watch(es6Path, ['babel', 'reload']);
});

gulp.task('default', ['scss', 'babel','watch', 'browser']);