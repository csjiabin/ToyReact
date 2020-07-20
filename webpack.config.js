module.exports = {
  entry: {
    main: "./main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-react-jsx", { pragma: "ToyReact.createElement" }],
            ],
          },
        },
      },
    ],
  },
  mode: "development",
  optimization: { minimize: false },
};
