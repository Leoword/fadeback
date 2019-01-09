'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: [
            path.resolve(__dirname, '../src/index.js'),
            'es5-shim',
            'es5-shim/es5-sham'
        ]
    },
    output: {
		filename: '[name].js',
		path:path.resolve(__dirname, '../dist'),
    },
    target: 'web',
    module: {
        rules:[
            {
				test: /\.js$/,
				exclude: /node_modules/,
                use: [
                    'es3ify-loader',
                    'babel-loader'
                ],

            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
            },
            {
				test: /\.css$/,
				use: ExtractTextPlugin.extract(['css-loader'])
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8000,
                    outputPath: 'images/'
                }
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)$/,
				loader: 'file-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ],
    node: false
};