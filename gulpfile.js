//const gulp = require('gulp');
//const autoprefixer = require('gulp-autoprefixer');
//const cssnano = require('gulp-cssnano')

/*
exports.default = () => (
    gulp.src('#src/scss/styles.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('#src/scss/'))
);

 */
const project_folder = 'dist';
const source_folder = '#src';

const path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/'
    },
    src: {
        html: source_folder + '/*.html',
        css: source_folder + '/scss/styles.scss',
        js: source_folder + '/js/script.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: source_folder + '/fonts/*.ttf'
    },
    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}'
    },
    clean: './' + project_folder + '/'
};

const {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include');

const browserSync = (params) => {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false
    });
};

const html = () => (
    src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
);

const build = gulp.series(html);
const watch = gulp.parallel(build, browserSync);

exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;