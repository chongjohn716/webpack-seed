const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const library = '[name]_lib'

module.exports = {
  entry: {
    vendors: ['lodash']
  },

  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dist'),
    library
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dist', '[name]-manifest.json'),
      // This must match the output.library option above
      name: library
    })
  ]
};