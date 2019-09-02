const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共的配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 用于将组件的css打包成单独的文件输出到`lib`目录中

const prodConfig = {
  mode: 'production', // 开发模式
  entry: path.join(__dirname, "../src/index.js"),
	output: {
    path: path.join(__dirname, "../lib/"),
    filename: "index.js",
    libraryTarget: 'umd', // 采用通用模块定义, 注意webpack到4.0为止依然不提供输出es module的方法，所以输出的结果必须使用npm安装到node_modules里再用，不然会报错
    libraryExport: 'default', // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
  },
	module: {
		rules: [
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader,'css-loader?modules'],
      },
    ]
	},
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.min.css" // 提取后的css的文件名
    })
  ],
	externals: { // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
};

module.exports = merge(prodConfig, baseConfig); // 将baseConfig和prodConfig合并为一个配置
