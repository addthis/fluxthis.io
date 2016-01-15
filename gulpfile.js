'use strict';

var gulp = require('gulp');
var saveLicense = require('uglify-save-license');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var gutil = require('gulp-util');

gulp.task('build', function(callback) {
    process.env.NODE_ENV = 'production';
    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: saveLicense
        })
    );

    webpackConfig.debug = false;
    webpackConfig.output.pathinfo = false;

    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});