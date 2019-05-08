
const webpack                  = require('webpack')
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackCleanPlugin       = require('clean-webpack-plugin')
const WebpackHtmlPlugin        = require('html-webpack-plugin')

module.exports = {
	'entry': {
		'app': './src/index.js',
	},
	'output': {
		'path': './public',
		'filename': '[name]-[chunkhash].js',
	},
	'module': {
		'rules': [
			{
				'test': /\.(js|jsx)$/,
				'use': [
					{
						'loader': 'babel-loader',
						'options': {
							'presets': ['es2015'],
						},
					},
				],
			},
			{
				'test': /\.vue$/,
				'use': [
					{
						'loader': 'vue-loader',
					},
				],
			},
			{
				'test': /\.css$/,
				'use': WebpackExtractTextPlugin.extract({
					'use': 'css-loader?' + JSON.stringify({ 'discardComments': { 'removeAll': true } }) + '',
				}),
			},
			{
				'test': /\.scss$/,
				'use': WebpackExtractTextPlugin.extract({
					'use': 'css-loader?' + JSON.stringify({ 'discardComments': { 'removeAll': true } }) + '!sass-loader',
				}),
			},
			{
				'test': /\.less$/,
				'use': WebpackExtractTextPlugin.extract({
					'use': 'css-loader?' + JSON.stringify({ 'discardComments': { 'removeAll': true } }) + '!less-loader',
				}),
			},
			{
				'test': /\.html$/,
				'use': [
					{
						'loader': 'html-loader',
					},
				],
			},
			{
				'test': /\.(png|jpg|jpeg|gif|svg|ttf|woff|woff2|eot)(\?)?(\?v=\d+\.\d+\.\d+)?$/,
				'use': [
					{
						'loader': 'url-loader',
					},
				],
			},
		],
	},
	'plugins': [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
		}),
		new WebpackExtractTextPlugin({
			'filename': '[name]-[contenthash].css',
			'allChunks': true,
		}),
		new WebpackCleanPlugin(['./public'], {
			'exclude': ['favicon.ico', 'apple-touch-icon.png', '.htaccess'],
			'verbose': false,
		}),
		new WebpackHtmlPlugin({
			'showErrors': false,
			'filename': 'index.html',
			'template': './src/index.html',
			'xhtml': true,
			'minify': {
				'collapseWhitespace': true,
				'keepClosingSlash': true,
				'removeComments': true,
			},
		}),
	],
}

