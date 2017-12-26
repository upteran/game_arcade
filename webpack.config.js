const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pixiModule = path.join(__dirname, '/node_modules/pixi.js/bin/pixi.js')
module.exports = {

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundle.js',
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
      // {
      //   test: /\.json$/,
      //   include: path.join(__dirname, 'node_modules', 'pixi.js'),
      //   loader: 'json',
      // }
    ]

  },
  plugins: [
      new CopyWebpackPlugin([
          { from: './assets', to: './' },
      ], {
          copyUnmodified: true,
          flatten: true
      })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080
  }

};
