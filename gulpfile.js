/*
 * @Author: siyuan.wang
 * @Date: 2020/3/4 10:52 AM
 * @Description: gulpfile
 */

var fs = require('fs'),
    del = require('del'),
    rev = require('gulp-rev'),
    gulp = require('gulp'),
    path = require('path'),
    replace = require('gulp-html-replace'),
    revCollector = require('gulp-rev-collector'),
    packageJson = require('./package.json');

console.log(packageJson.version);

var /* 源文件地址 */
    srcPath = path.resolve(__dirname, './'),
    htmlPath = path.resolve(srcPath, 'html/**/*.html'),
    assetsPath = path.resolve(srcPath, 'assets'),
    scriptsPath = path.resolve(srcPath, 'scripts/**/*'),
    cssPath = path.resolve(assetsPath, 'styles/**/*.css'),
    assetsImagesPath = path.resolve(assetsPath, 'images/**/*'),
    /* 目标文件地址 */
    buildPath = path.resolve(__dirname, 'build'),
    htmlBuildPath = path.resolve(buildPath, 'html'),
    assetsBuildPath = path.resolve(buildPath, 'assets'),
    scriptsBuildPath = path.resolve(buildPath, 'scripts'),
    cssBuildPath = path.resolve(assetsBuildPath, 'styles'),
    assetsImagesBuildPath = path.resolve(assetsBuildPath, 'images'),
    revManifestJson4jsPath = path.resolve(scriptsBuildPath, 'rev-manifest.json'),
    revManifestJson4cssPath = path.resolve(cssBuildPath, 'rev-manifest.json');

var indexHtmlPath = path.resolve(srcPath, 'index.html'),
    indexHtmlBuildPath = path.resolve(buildPath, 'index.html');

function clean() {
    if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);

    return del([buildPath]);
}

function hash2js() {
    return gulp
        .src([scriptsPath])
        .pipe(rev())
        .pipe(gulp.dest(scriptsBuildPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(scriptsBuildPath));
}

function hash2css() {
    return gulp
        .src([cssPath])
        .pipe(rev())
        .pipe(gulp.dest(cssBuildPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(cssBuildPath));
}

function replacingHtmlWithManifest() {
    return gulp
        .src([revManifestJson4jsPath, revManifestJson4cssPath, indexHtmlPath])
        .pipe(revCollector())
        .pipe(gulp.dest(buildPath));
}

function movingHTMLs() {
    return gulp.src(htmlPath).pipe(gulp.dest(htmlBuildPath));
}

function movingImages() {
    return gulp.src(assetsImagesPath).pipe(gulp.dest(assetsImagesBuildPath));
}

function writingVersionIntoHtml() {
    return gulp
        .src(indexHtmlBuildPath)
        .pipe(
            replace({
                version: {
                    src:  packageJson.version,
                    tpl: '<script type="text/javascript">var __VERSION__ = "%s";</script>'
                }
            })
        )
        .pipe(gulp.dest(buildPath));
}

var build = gulp.series(
    clean,
    hash2js,
    hash2css,
    replacingHtmlWithManifest,
    movingHTMLs,
    movingImages,
    writingVersionIntoHtml
);

exports.default = build;
