var gulp = require('gulp'),
  bowerFiles = require('main-bower-files'),
  angularFilesort = require('gulp-angular-filesort'),
  inject = require('gulp-inject'),
  concat = require('gulp-concat');

gulp.task('inject', function() {
  gulp.src('./app/index.html')
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), { name: 'bower' }))
    .pipe(inject(gulp.src('./app/**/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here 
      .pipe(angularFilesort())
    ))
    .pipe(gulp.dest('./app'));
})

gulp.task('concat', function() {
  return gulp.src(bowerFiles(), {read: false}), { name: 'bower' }
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./app/dist/'));
});