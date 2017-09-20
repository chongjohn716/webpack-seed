const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const library = '[name].[hash]'

module.exports = {
  entry: {
    vendors: ['lodash'],
    "vendors.css": ['minireset.css']
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    library
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname)
      }
    ]
  },

  plugins: [
    // 删除文件
    new CleanWebpackPlugin(
      //匹配删除的文件
      [
        'dist/manifest.*.json',
        // TODO: 分离 CSS
        // 'dist/vendor.*.css',
        'dist/vendors.*.js'
      ],
      {
        root: __dirname,       　　　  　　　//根目录
        verbose: true,        　　　　　　　 //开启在控制台输出信息
        dry: false        　　　　　　　　　 //启用删除文件
      }
    ),

    // 代码 JS 压缩
    new webpack.optimize.UglifyJsPlugin({
      warnings: false,
      compress: {
        join_vars: true,
        warnings: false,
      },
      toplevel: false,
      ie8: false
    }),

    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dist', 'manifest.[hash].json'),
      // This must match the output.library option above
      name: library
    })
  ]
};