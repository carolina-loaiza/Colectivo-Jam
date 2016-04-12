var gulp = require('gulp'),
  bowerFiles = require('main-bower-files'),
  angularFilesort = require('gulp-angular-filesort'),
  inject = require('gulp-inject'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  nodemon = require('gulp-nodemon'),
  reload = browserSync.reload;

var scssFiles = [
    './app/assets/partials/*.scss',
    './app/components/**/*.scss',
    './app/**/*.scss'
  ]

gulp.task('styles', function() {
  gulp.src('./app/assets/styles/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest('app/assets/styles'))
    /* Reload the browser CSS after every change */
    .pipe(reload({stream:true}));
});

//Watch task
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(scssFiles, ['styles']);
});

gulp.task('inject', function() {
  gulp.src('./app/index.html')
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), { relative: true, name: 'bower' }))
    .pipe(inject(gulp.src(['!./app/bower_components/**/*', './app/**/*.js']) 
      .pipe(angularFilesort()), { relative: true}
    ))
    .pipe(gulp.dest('./app'));
})

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  
  var started = false;
  return nodemon({
    script: './app.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true; 
    } 
  });
});

gulp.task('concat', function() {
  return gulp.src(bowerFiles(), {read: false}), { name: 'bower' }
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./app/dist/'));
});