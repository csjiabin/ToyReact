"use strict";
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  optimization: { minimize: false },
  devServer: {
    compress: true,
    port: 9000,
    progress: true,
  },
});
