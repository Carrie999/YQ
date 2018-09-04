'use strict'

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // entry: './src/core/index.js',
  entry: './src/platform/web/entry-runtime-with-compiler.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'test.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [['es2015', { modules: false }], 'stage-1']
        }
      }
    ]
  },
  resolve: {
    alias: {
      "src":path.resolve("src"),
      "shared":path.resolve("src/shared"),
      "core":path.resolve("src/core"),
      "web":path.resolve("src/platform/web"),
      "compiler":path.resolve("src/compiler"),
     
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    port: 8092
  }
}
