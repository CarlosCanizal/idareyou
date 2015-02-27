var gulp = require('gulp');
var paths = require('./gulp/gulp.config.json');
var $ = require('gulp-load-plugins')();

gulp.task('default', ['watch','jade','sass']);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade', 'sass']);
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe($.plumber())
    .pipe($.sass({sourceComments:'normal'}))
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest(function(file) {
      return file.base; 
    }))
    .pipe($.size());
});

gulp.task('jade', function () {
  return gulp.src(paths.jade)
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest(function(file) {
      return file.base; 
    }))
});
