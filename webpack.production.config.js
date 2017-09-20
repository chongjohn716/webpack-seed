const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'main.js')
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  // TODO：与 ProvidePlugin 的区别
  externals: {
    jquery: 'window.jQuery',
    $fadeIn: 'window.$fadeIn',
    log: 'window.log'
  },

  // devtool: 'none',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      },
      // {
      //   test: /\.css$/,
      //   loader: ['style-loader', 'css-loader'],
      //   include: path.resolve(__dirname)
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true //css压缩
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        // 分离 css 文件
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true //css压缩
            }
          }, 'sass-loader']
        })
        // loader: ['style-loader', 'css-loader', 'sass-loader'],
        // include: path.resolve(__dirname, 'src')
      }
    ]
  },

  plugins: [
    // 打包后的文件头部添加信息
    new webpack.BannerPlugin('版权信息'),

    // 将打包代码插入到 html 模板中
    new HtmlWebpackPlugin({
      filename: 'index.jsp',
      favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
      //压缩HTML文件
      minify: {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),

    // 分离CSS和JS文件
    new ExtractTextPlugin("[name].[hash].css"),

    // 将依赖单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // 该配置假定你引入的 bootstrap 存在于 node_modules 目录中
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),

    // 
    new webpack.optimize.CommonsChunkPlugin({
      //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
      name: 'manifest'
    }),

    // 删除文件
    new CleanWebpackPlugin(
      //匹配删除的文件
      [
        'dist/app.*.css',
        'dist/app.*.js',
        'dist/manifest.*.js',
        'dist/vendor.*.css',
        'dist/vendor.*.js'
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

    // 复制静态资源到输入(dist)目录
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public')
      }
    ], {
        ignore: [],
        copyUnmodified: false,
        debug: "debug"
      })
  ]
};