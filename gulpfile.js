var gulp        =require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

//Gulp Sass command -compile sass into CSS & auto-inject into browser& js
gulp.task('sass', function(){
  return gulp.src("app/scss/*.scss")
  .pipe(sass())
  .pipe(gulp.dest("app/css"))
  .pipe(browserSync.stream());
});
gulp.task('js', function(){
 return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
 .pipe(gulp.dest("app/js"))
 .pipe(browserSync.stream());
  });

//Gulp serve command -static server + watching scss/html files

gulp.task('serve', gulp.series('sass', function() {

  browserSync.init({
    server: "./app/"
  });

  gulp.watch("app/scss/*.scss", gulp.series('sass'));
  gulp.watch("app/*.html").on('change', browserSync.reload);
}));


//Gulp command default-allows local server to start
gulp.task('default', gulp.series('js', 'serve'));
