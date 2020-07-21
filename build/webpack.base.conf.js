"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolve = (dir) => {
  return path.resolve(__dirname, "..", dir);
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
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //添加在这里
      template: "index.html",
      filename: "index.html",
      inject: true,
    }),
  ],
};
