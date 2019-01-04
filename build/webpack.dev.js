'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const application = require('./webpack.base');

application.mode = 'development';

application.devtool = 'inline-source-map';

application.output.publicPath = '/';

application.devServer = {
	port: 8000,
	hot: false,
	inline: false,
	host: 'localhost',
	proxy: {
	}
};

application.plugins.push(
    new HtmlWebpackPlugin({
		filename: 'index.html',
		template: path.resolve(__dirname, './index.html'),
		inject: "head"
	}),
	// new webpack.DefinePlugin()
);

module.exports = application;