const path = require("path");
const join = (url) => {
  return path.join(__dirname, url);
};
module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: join("dist"),
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
  mode: "development",
  optimization: { minimize: false },
  devServer: {
    contentBase: join("src"),
    compress: true,
    port: 9000,
    progress: true,
  },
};
