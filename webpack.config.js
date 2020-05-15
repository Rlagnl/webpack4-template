const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  //entry为入口,webpack从这里开始编译
  entry: [
    "babel-polyfill",
    path.join(__dirname, './src/index.ts')
  ],
  //output为输出 path代表路径 filename代表文件名称
  output: {
    path: path.join(__dirname, './output'),
    filename: 'bundle.[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'output'),  //启动路径
    host: 'localhost',  //域名
    port: 8018,  //端口号
    hot: true,
    open: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  //module是配置所有模块要经过什么处理
  //test:处理什么类型的文件,use:用什么,include:处理这里的,exclude:不处理这里的
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192  //8k一下的转义为base64
          }
        }]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",  //打包后的文件名
      template: path.join(__dirname, "./index.html")  //要打包文件的路径
    }),
    new CleanWebpackPlugin(),
    new uglify()
  ],
};
