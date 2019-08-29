const path = require("path");
module.exports = {
  entry: {
    main: ["babel-polyfill", "./lib/Markers.js"]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loaer"
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: "file-loader"
      }
    ]
  }
};
