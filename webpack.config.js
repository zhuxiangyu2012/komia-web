const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin'); 
const Webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

function resolve (dir){
	return path.join(__dirname,dir)
}

const config = {
	entry: ["babel-polyfill",resolve('app/index.js')],
	output: {
		filename:'[name]-[hash].js',
		path: resolve('dist')
	},
	performance: {
	  hints: false
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.css'],
	    alias: {
	      '@':  resolve('app'),
	      '@c': resolve('app/components'),
		  '@s': resolve('app/static'),
		  '@p': resolve('app/pages'),
	    }
	},
	module: {
		rules:[
			{
				test: /\.vue$/,
				use: [
					{
						loader:'vue-loader',
					},
					{
						loader: 'iview-loader',
						options: {
							prefix: false
						}
					}
				]
			},
			{
				test: /\.js$/,
				include:resolve('app'),
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-transform-runtime'
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader:'style-loader',
					},
					{
						loader:'css-loader',
						options: { importLoaders: 1 } 
					},
					{
						loader:'postcss-loader',
						options:{
							plugins:[
								require('autoprefixer')
							]
						}
					},
				]
			},
			{
				test:  /\.(gif|jpg|png|svg)$/i,
				use:[
					{
						loader: 'url-loader',
						options: {
						  limit: 1024*100,
						  name: '[name].[ext]',
						  outputPath: 'images',
						}
					}
				]
			},
			{
				test: /\.(woff|eot|ttf)\??.*$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts'
						}
					}
				]
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin(),
		new Webpack.DefinePlugin({
		      'process.env.NODE_ENV': {
		        // 判断是否isDev，若是，则为development；若不是，则为production
		        NODE_ENV: isDev ? JSON.stringify('development') : JSON.stringify('production') 
		      }
		}),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			title: 'Komia',
			minify: { // 压缩HTML文件
				removeComments: true, // 移除HTML中的注释
				collapseWhitespace: true, // 删除空白符与换行符
				minifyCSS: true,// 压缩内联css
			}
		})
	],
}

if (isDev) {
	// 作用：在页面上调试代码，使用source-map映射编译代码
	config.devtool = '#cheap-module-eval-source-map';
	// 在config上加一个devServer配置
	config.devServer = {
	// 启动的服务端口
		port: 8000,
		// 通过localhost或IP进行访问
		host: '127.0.0.1',
		// 若编译过程中有错误，显示到网页上,便于定位错误
		overlay: {
		  errors: true,
		},
		//热加载，功能：只渲染所改组件的页面效果，不会全部刷新，其他页面数据依然会存在
		hot: true,
		open: true
	 },
	// 加插件，push一个新的webpack plugin
	config.plugins.push(
		// 启动热更新功能插件
		new Webpack.HotModuleReplacementPlugin(),
		// 帮助减少不需要的信息展示
		new Webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;