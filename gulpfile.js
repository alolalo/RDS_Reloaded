const gulp = require('gulp');
const sass = require('node-sass');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');

// Define a task to compile Sass and generate CSS
gulp.task('sass', () => {
  config.generateCSS();
});

// Watch for changes in Sass files and run the Sass task
gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.sass', gulp.series('sass'));
});

// Define a default task to run all tasks
gulp.task('default', gulp.series('sass', 'watch'));