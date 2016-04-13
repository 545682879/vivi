var gulp = require('gulp');
/*
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config');
gulp.task("webpack", function() {
    return gulp
        .src('./')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./build'));
});
*/
// jsx
var react = require('gulp-react');
gulp.task('jsx', function() {
    gulp.src('src/*.jsx')
        .pipe(react().on('error', function(err) {
            console.error('Error!', err.message, err.fileName);
        }))
        .pipe(gulp.dest('src'));
});