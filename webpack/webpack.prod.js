const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  //入口
  entry: "./src/main/webapp/app/index.tsx",

  //输出
  output: {
    //文件路径
    path: path.resolve(__dirname, "../target/classes/static"),
    //文件名
    filename: "index.js",
    //自动清空上次打包结果
    clean: true,
  },

  //加载器
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      },
      { test: /\.(ts|tsx)$/, use: "ts-loader" },
      //图片等其他静态资源
      {
        test: /.(png|jp?g|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "../target/classes/static/[hash:10][ext][query]",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  //插件
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src/main/webapp/app"),
    }),
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, "../src/main/webapp/index.html"),
    }),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin(),
  ],

  //模式
  mode: "production",
};
