const gulp = require('gulp');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

const paths = {
    styles: {
        src: 'scss/**/*.scss',
        dest: './app/css'
    },
    layout: {
        src: 'html/**/*.html',
        dest: 'app'
    },
    scripts: {
        src: 'scripts',
        dest: 'app/js'
    }
};

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.styles.dest))
}

function layout() {
    return gulp.src(paths.layout.src)
        .pipe(plumber())
        .pipe(rigger())
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
