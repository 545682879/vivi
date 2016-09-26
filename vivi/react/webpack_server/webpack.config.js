var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanPlugin = require('clean-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

var path = require('path');
var glob = require('glob');

function entries (globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, '.js');
        //entries[path.join(dirname, basename)] = './' + entry;
        //用上面的方式访问不到，不知道为什么
        entries[entry.slice(0, -3)] = entry;
    }
    entries['bundle'] = ['webpack-dev-server/client?http://127.0.0.1:8888', 'webpack/hot/only-dev-server', "./js/app.js"]
    return entries;
}


console.log(__dirname, entries("./js/**/main.js"))

module.exports = {
    entry: entries("./js/**/main.js"),
    output: {
		publicPath: "//127.0.0.1:8888/build/",
        path: './build',
        //filename: production ? '[name]-[hash].js' : 'bundle.js',
        //filename: 'bundle.js',
        filename: '[name]' + '.js' //,
        //chunkFilename: '[name]-[chunkhash].js'
    },
  	postcss: [
  		require('autoprefixer')
  	],

    //devtool: "source-map",
    //source-map  在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包文件的构建速度；
    //cheap-module-source-map 在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
    //eval-source-map 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项；
    //cheap-module-eval-source-map  这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；


    module: {
        loaders: [
			      {test: /\.js[x]?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader']},
            // { test: /\.css$/, loader: "style!css?modules!postcss" },
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?postcss')},
            {test: /\.less/,loader: 'style-loader!css-loader!less-loader'},
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader"
              /*,
              query:
                {
					         presets:['react','es2015']
                }*/
            },
            {test: /\.json$/, loader: "json"},
            {test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader?limit=8192'},
            {test: /\.handlebars$/, loader: "handlebars-loader"}
        ]
    },
    resolve:{
        extensions:['','.js','.jsx','.json','.css'],
        fallback: path.join(__dirname, "js/template/helpers")
    },
    devServer: {
        hot: true,
        inline: true,
        port:8888,
        contentBase: "./",
    },
    plugins: [
	  	new webpack.DefinePlugin({
  			'process.env.NODE_ENV': '"development"'
  		}),
  		//提取出公共文件，放到common里 多个 html共用一个js文件(chunk)
  		new webpack.optimize.CommonsChunkPlugin('./common/common.js'),
  		//报错但不退出webpack进程
    	new webpack.NoErrorsPlugin(),
  		//代码热替换 server使用
    	new webpack.HotModuleReplacementPlugin(),
  		//将css成生文件，而非内联
    	new ExtractTextPlugin("bundle.css"),
  		//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
  		//new webpack.optimize.OccurenceOrderPlugin(),
  		//代码丑化，UglifyJsPlugin
  		//new webpack.optimize.UglifyJsPlugin()，
  		//清理文件夹
  		new CleanPlugin(["build"])
  		//new CleanPlugin(['dist', 'build'])
		
    ]
};