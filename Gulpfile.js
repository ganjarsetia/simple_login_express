/**
 * Gulp untuk development
 * Created By: Ganjar Setia M
 */

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    spawn = require('child_process').spawn,
    node;

/**
 * $ gulp server
 * description: jalankan server, jika server sudah jalan, matikan
 */
gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['server.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

/**
 * $ gulp lint
 * description: cek code error & warning
 */
gulp.task('lint', function() {
    return gulp.src(['server.js', './app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * $ gulp watch
 * description: cek jika ada file yang berubah & restart
 */
gulp.task('watch', function() {
    var watcher = [];

    //masukan watch ke dalam array
    watcher[0] = gulp.watch('server.js', ['lint']);
    watcher[1] = gulp.watch('./app/**/*.js', ['lint']);
    watcher[2] = gulp.watch('./config/**/*.js');

    //untuk semua isi array watcher jalankan cek perubahan
    for (var i = 0; i < watcher.length; i++) {
      watcher[i].on('change', show_perubahan);
    }

});

/**
 * $ gulp
 * description: jalankan default gulp
 */
gulp.task('default', ['lint', 'server', 'watch'], function() {

});

// jika ada error, keluar
process.on('exit', function() {
    if (node) node.kill();
});

function show_perubahan (event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}