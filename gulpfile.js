var sync = require('browser-sync');
var reload = sync.reload;
var gulp = require('gulp');
var gutil = require('gulp-util');
var less  = require('gulp-less');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var config = {
    less: {
        src: './src/less/main.less',
        dest: './build/css',
        watch: './src/less/**/*.less'
    },
    html: {
        src: './src/html/**/*.html',
        dest: './build',
        watch: './src/html/**/*.html'
    }
};


gulp.task('less', function() {
    return gulp.src(config.less.src)
        .pipe(plumber({
            errorHandler: function (err) {
                gutil.log(err.message);
                sync.notify("Less Compilation Error!");
                this.emit("end");
            }
        }))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(minify())
        .pipe(gulp.dest(config.less.dest))
        .pipe(reload({stream: true}));
});

gulp.task('html', function() {
    return gulp.src(config.html.src)
      .pipe(gulp.dest(config.html.dest))
      .pipe(reload({stream: true}));
});

gulp.task('sync', function() {
    sync({
        server: "./build",
        open: false
    });
});

gulp.task('watch',['less', 'html', 'sync'], function() {
    gulp.watch(config.less.watch, ['less']);
    gulp.watch(config.html.watch, ['html']);
});