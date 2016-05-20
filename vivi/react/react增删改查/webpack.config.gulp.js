var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  entry: {
	div: './src/div.jsx',
    hello: './src/hello.jsx',
    entry: './src/entry.jsx'
  },
  output: {
	//path: './dist',
    filename: "[name].js",
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader!jsx-loader?harmony'
    }]
  }
};