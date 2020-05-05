"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var del = require("del");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
  imagemin.optipng({optimizationLevel: 3}),
  imagemin.mozjpeg({progressive: true}),
  imagemin.svgo()
  ]))
  .pipe(gulp.dest("source/img"));
 });


 gulp.task("copy", function () {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/img/**",
  "source/js/**",
  "source/*.ico",
  "source/*.html"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
 });


 gulp.task("clean", function () {
  return del("build");
 });


 gulp.task('minify', () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
});


gulp.task('minijs', function () {
  return gulp.src('source/js/script.js')
        .pipe(uglify())
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest('build/js'));
});


gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});


gulp.task("build", gulp.series("clean", "copy", "css", "minify", "minijs"));
gulp.task("start", gulp.series("build", "server"));
