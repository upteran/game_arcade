const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      screw_ie8: true,
      compressor: {
        warnings: false,
      },
    }),
    new CopyWebpackPlugin([
          { from: './assets', to: './' },
      ], {
          copyUnmodified: true
      })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },

};
