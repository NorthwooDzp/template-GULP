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
    return gulp.src('./pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .on('error', function (err) {
            console.log(err);
        })
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

gulp.task('sass-buid', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .on('error', function (err) {
            console.log(err);
        })
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .on('error', function (err) {
            console.log(err);
        })
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('pug/*.pug', ['pug']);
    gulp.watch('pug/**/*.pug').on('change', function () {
        setTimeout(function () {
            browserSync.reload();
        }, 1000)
    });
    gulp.watch('scss/*.scss').on('change', function () {
        setTimeout(function () {
            browserSync.reload();
        }, 1000)
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

gulp.task('default', ['pug', 'sass','watch', 'browser-sync']);
gulp.task('build', ['pug', 'sass-build']);