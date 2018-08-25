// 'use strict'

// const webpack = require('webpack')
// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, '../dist'),
//     filename: 'webptest.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         options: {
//           presets: [['es2015', { modules: false }], 'stage-1']
//         }
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, 'index.html'),
//       filename: 'webp.html',
//       // inject: 'body'
//       inject: true
//     }),
//     new webpack.HotModuleReplacementPlugin(),
//   ],
//   // devtool: 'source-map',
//   devServer: {
//     port: 8092
//   }
// }
