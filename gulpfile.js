const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

const paths = {
    styles: {
        src: 'scss/**/*.scss',
        dest: './app/css'
    },
    layout: {
        src: 'pug/**/*pug',
        dest: 'app'
    },
    scripts: {
        src: 'scripts',
        dest: 'app/js'
    }
};

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.styles.dest))
}

function layout() {
    return gulp.src(paths.layout.src)
        .pipe(pug({pretty: true}).on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest(paths.layout.dest))
}

function serve() {
    browserSync.init({
        server: './app'
    });
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.layout.src, layout);

    gulp.watch(paths.styles.src).on('change', () => {
        setTimeout(() => {
            browserSync.reload();
        }, 500)
    });

    gulp.watch(paths.layout.src).on('change', () => {
        setTimeout(() => {
            browserSync.reload();
        }, 500)
    });

    gulp.watch('./app.js/*.js').on('change', browserSync.reload);

}

const def = gulp.parallel(serve, styles, layout, watch);

gulp.task('styles', styles);
gulp.task('pug', layout);
gulp.task('watch', watch);

gulp.task('default', def);