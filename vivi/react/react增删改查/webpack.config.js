var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  entry: {
    entry: './src1/entry.jsx',
	frame: './src1/frame.jsx'
  },
  output: {
	path: './dist1',
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
  },
  plugins: [commonsPlugin]
};