var gulp = require('gulp');
var paths = require('./gulp/gulp.config.json');
var $ = require('gulp-load-plugins')();
var htmlreplace = require('gulp-html-replace');
gulp.task('default', ['watch','jade','sass']);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade', 'sass']);
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe($.plumber())
    .pipe($.sass({sourceComments:'normal',indentedSyntax:true}))
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

gulp.task('styles', function () {
  return gulp.src([
      'src/client/bower_components/pure/pure-min.css',
      'src/client/bower_components/pure/grids-responsive-min.css',
      'src/client/bower_components/components-font-awesome/css/font-awesome.min.css',
      'src/client/common/css/main.css'
    ])
    .pipe($.concat('main.css'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/css'))
    .pipe($.notify({message: 'Styles task complete'}));
});

//Scripts
gulp.task('scripts', function () {
    return gulp.src(["src/client/bower_components/angular/angular.js",
    "src/client/bower_components/angular-ui-router/release/angular-ui-router.min.js",
    "src/client/bower_components/angular-resource/angular-resource.min.js",
    "src/client/bower_components/angular-local-storage/dist/angular-local-storage.min.js",
    "src/client/bower_components/angular-animate/angular-animate.min.js",
    "src/client/bower_components/underscore/underscore-min.js",
    "src/client/bower_components/jquery/dist/jquery.min.js",
    "src/client/bower_components/angular-toastr/dist/angular-toastr.min.js",
    "src/client/bower_components/restangular/dist/restangular.min.js",
    "src/client/bower_components/ng-file-upload/angular-file-upload-all.min.js",
    "src/client/bower_components/angular-gravatar/build/md5.min.js",
    "src/client/bower_components/angular-gravatar/build/angular-gravatar.min.js",
    "src/client/app/app.module.js",
    "src/client/app/layout/layout.module.js",
    "src/client/app/dare/dare.module.js",
    "src/client/app/core/core.module.js",
    "src/client/app/storage/storage.module.js",
    "src/client/app/core/initialize.js",
    "src/client/app/core/config.js",
    "src/client/app/storage/storage.service.js",
    "src/client/app/core/headers/parse.headers.js",
    "src/client/app/core/parse/parse.api.js",
    "src/client/app/core/dare/dare.api.js",
    "src/client/app/core/user/user.api.js",
    "src/client/app/core/user/passwordMatch.directive.js",
    "src/client/app/layout/shell.controller.js",
    "src/client/app/dare/new/dare.controller.js",
    "src/client/app/dare/invite/invite.controller.js",
    "src/client/app/dare/response/response.controller.js",
    "src/client/app/dare/show/challenge.show.controller.js",
    "src/client/app/user/user.controller.js",
    "src/client/app/dare/list/challenges.controller.js"])
        // .pipe($.jshint())
        // .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.concat('main.js'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify({mangle:false}))
        .pipe(gulp.dest('dist/js'))
        .pipe($.notify({message: 'Scripts task complete'}));
});

//Images
gulp.task('images', function () {
  return gulp.src('src/client/common/images/*')
    .pipe($.cache($.imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest('dist/images'))
    .pipe($.notify({message: 'Images task complete'}));
});

gulp.task('copyfiles', function () {
  gulp.src('src/client/app/**/*.html')
    .pipe(gulp.dest('dist/app'));
  gulp.src('src/client/common/css/fonts/**')
    .pipe(gulp.dest('dist/css/fonts'));
  gulp.src('src/client/bower_components/components-font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('indexhtml', function () {
  gulp.src('src/client/index.html')
      .pipe(htmlreplace({
          'css': 'css/main.min.css',
          'js': 'js/main.min.js'
      }))
      .pipe(gulp.dest('dist/'));
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['clean'], function () {
    gulp.start('styles', 'scripts', 'images','copyfiles','indexhtml');
});





