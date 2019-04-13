var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

// Compile SASS into CSS and auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
                    .pipe(sass())
                    .pipe(gulp.dest('src/css'))
                    .pipe(browserSync.stream());
});

// Move the JavaScript files into our /src/js folder.
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss / html files
gulp.task('serve', gulp.parallel('sass'), function () {

    browserSync.init({
        server: "src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.parallel('scss'));
    gulp.watch("src/*.html").on('change', browserSync.reload);

});
gulp.task('default', gulp.parallel('js', 'serve'));