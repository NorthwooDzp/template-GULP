var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();


gulp.task('pug', function () {
    gulp.src('./pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./app'))
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('app/img'));
});

gulp.task('sass', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(gulp.dest('app/css'));
});



gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('pug/*pug', ['pug']);
    gulp.watch('pug/**/*.pug').on('change', function () {
        setTimeout(function () {
            browserSync.reload();
        }, 500)
    });
    gulp.watch('scss/!**/!*.scss').on('change', function () {
        setTimeout(function () {
            browserSync.reload();
        }, 500)
    });
    gulp.watch('app/js/*.js').on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
});

gulp.task('default', ['watch', 'browser-sync']);