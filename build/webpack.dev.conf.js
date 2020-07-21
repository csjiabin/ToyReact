"use strict";
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const port = process.env.PROT || 9000;
module.exports = merge(baseWebpackConfig, {
  mode: "development",
  optimization: { minimize: false },
  plugins: [new OpenBrowserPlugin({ url: `http://localhost:${port}` })],
  devServer: {
    port,
    compress: true,
    progress: true,
  },
});
