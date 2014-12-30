var gulp 		= require('gulp');
var sass 		= require('gulp-sass')
var minifyCSS 	= require('gulp-minify-css');
var rename 		= require("gulp-rename");
var concat 		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');
var prefix      = require('gulp-autoprefixer');
var connect     = require('gulp-connect');

var paths = {
    sass: './sass',
    styles: './sass/style.scss',
    css: './css',
    scripts: ['./scripts'],
    origimages: './orig-images',
    images: './images'
};


gulp.task('styles', function () {
    gulp.src(paths.styles)
        .pipe(sass())
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest(paths.css))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.css))
        .pipe(connect.reload());
});

// gulp.task('scripts', function() {
//     gulp.src([
//         paths.scripts + '/vendor/jquery-1.11.1.min.js',
//         paths.scripts + '/modules/*.js'])
//         .pipe(concat('main.js'))
//         .pipe(gulp.dest(paths.scripts))
//         .pipe(uglify())
//         .pipe(concat('main.min.js'))
//         .pipe(gulp.dest(paths.scripts))
// });

gulp.task('images', function () {
    return gulp.src('orig-images/')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images/'));
});

gulp.task('connect', function() {
  connect.server({
        root: [__dirname],
        livereload: true
  });
});

gulp.task('html', function () {
    gulp.src('./*.html')
    .pipe(connect.reload());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.sass + '/**/*', ['styles']);
    gulp.watch(paths.origimages + '/**/*', ['images']);
});

gulp.task('default', ['styles', 'images', 'connect', 'watch']);