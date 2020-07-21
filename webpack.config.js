"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolve = (url) => {
  return path.resolve(__dirname, url);
};
module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: resolve("dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //添加在这里
      template: resolve("src/index.html"),
      filename: "index.html",
      inject: "body",
    }),
  ],
  mode: "development",
  optimization: { minimize: false },
  devServer: {
    contentBase: resolve("src"),
    compress: true,
    port: 9000,
    progress: true,
  },
};
