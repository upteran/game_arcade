const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: './src/index.js',

  output: {
    path: './dist/assets',
    filename: 'bundle.min.js',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      screw_ie8: true,
      compressor: {
        warnings: false,
      },
    }),
    new CopyWebpackPlugin([
          { from: './assets', to: './assets' },
      ], {
          copyUnmodified: true
      })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },

};
