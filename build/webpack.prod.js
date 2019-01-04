'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const application = require('./webpack.base');

application.output.publicPath = '/';
application.mode = 'none';

application.plugins.push(
    new HtmlWebpackPlugin({
		filename: 'index.html',
		template: path.resolve(__dirname, './index.html'),
		inject: "head"
    }),
    // new webpack.DefinePlugin(),
    new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
                warnings: false
            },
            ie8: true
        }
    })
);

module.exports = application;