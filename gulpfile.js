var gulp = require('gulp')
var less = require('gulp-less')
var sourcemaps = require('gulp-sourcemaps')
var LessPluginCleanCSS = require('less-plugin-clean-css')
var LessPluginAutoPrefix = require('less-plugin-autoprefix')
var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var gutil = require('gulp-util')
var watch = require('gulp-watch')
var rename = require('gulp-rename')

var cleancss = new LessPluginCleanCSS({ advanced: true })
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] })

var DEV_BUILD_DIR = './dev-public'
var PROD_BUILD_DIR = './public'
var LESS_GLOB = './src/less/**/*.less'
var LESS_ROOT = './src/less/main.less'
var LESS_BUNDLE_NAME = 'bundle.css'
var JS_ROOT = './src/js/app.jsx'
var JS_BUNDLE_NAME = 'bundle.js'

gulp.task('default', ['dev-css', 'dev-js', 'livereload'])
gulp.task('build', ['apply-prod-environment', 'prod-css', 'prod-js', 'copy-index'])

gulp.task('livereload', function() {
    require('./livereload-server').exec
    gutil.log('Livereload server running...')
})

gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
})

gulp.task('copy-index', function() {
    gulp.src([DEV_BUILD_DIR + '/index.html']).pipe(gulp.dest(PROD_BUILD_DIR))
})

gulp.task('dev-css', function(){
    watch(LESS_GLOB, function() {
        gutil.log('Recompiling LESS')
        return compileLess(false)
    })
    return compileLess(false)
})

gulp.task('prod-css', function(){
    return compileLess(true)
})

gulp.task('dev-js', function() {
    var b = getBrowserifyInstance(false)
    var w = watchify(b)

    w.transform('babelify', { presets: ['es2015', 'react', 'stage-0'] })
    w.on('update', function() {
        gutil.log('Updating JS bundle')
        bundleBrowserify(w)
    })
    bundleBrowserify(w, false)
})

gulp.task('prod-js', function() {
    var b = getBrowserifyInstance(true)
    b.transform('babelify', { presets: ['es2015', 'react', 'stage-0'] })
    return bundleBrowserify(b, true)
})

function compileLess(forProduction) {
    var plugins = [autoprefix]
    if (forProduction) {
        plugins.push(cleancss)
    }
    return gulp.src([LESS_ROOT])
    .pipe(!forProduction ? sourcemaps.init() : gutil.noop())
    .pipe(less({ plugins: plugins }))
    .pipe(!forProduction ? sourcemaps.write() : gutil.noop())
    .pipe(rename(LESS_BUNDLE_NAME))
    .pipe(getDest(forProduction))
    .on('end', function(){ gutil.log('LESS compiled') })
}

function getBrowserifyInstance(forProduction) {
    return browserify(JS_ROOT, {
        debug: !forProduction,
        extensions: ['.jsx'],

        // watchify args
        cache: {},
        packageCache: {}
    })
}

function bundleBrowserify(browserifyInstance, forProduction) {
    return browserifyInstance.bundle(function(err){
        if(err){
            console.error(err.message)
        }
    })
    .pipe(source(JS_BUNDLE_NAME))
    .pipe(buffer())
    .pipe(forProduction ? uglify() : gutil.noop())
    .pipe(getDest(forProduction))
    .on('end', function(){ gutil.log('JS bundling complete') })
}

function getDest(forProduction) {
    return gulp.dest(forProduction ? PROD_BUILD_DIR : DEV_BUILD_DIR)
}
