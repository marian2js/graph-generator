const gulp = require('gulp');
const gls = require('gulp-live-server');

gulp.task('serve', function() {
  const srcFiles = 'server/**/*.js';
  const staticAssets = [
    'client/**/*.css',
    'client/**/*.html',
    'server/views/**/*.ejs'
  ];

  const server = gls('./server/bin/www');
  server.start();

  gulp.watch(staticAssets, file => {
    server.notify.apply(server, [file]);
  });
  gulp.watch(srcFiles, file => {
    server.start();
    server.notify.apply(server, [file]);
  });
});