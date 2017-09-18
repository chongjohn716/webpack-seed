let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'main.js')
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  externals: {
    jquery: 'window.jQuery',
    $fadeIn: 'window.$fadeIn',
    log: 'window.log'
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname)
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, 'src')
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ]
};