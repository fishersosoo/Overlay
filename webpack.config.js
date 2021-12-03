/*
 * @Author: Souma
 * @LastEditTime: 2021-12-02 00:34:53
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // mode: "development",
  // devtool: "eval-cheap-module-source-map",
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: {
    // castingMonitor: "./src/castingMonitor/index.js",
    // fflogsUploaderDownload: "./src/fflogsUploaderDownload/index.js",
    // keigennRecord: "./src/keigennRecord/index.js",
    // keySkillTimer: "./src/keySkillTimer/index.js",
    // teamWatch: "./src/teamWatch/index.js",
    test: "./src/test/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.join(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash:8].[ext]",
            outputPath: "images",
            limit: 20480,
          },
        },
      },
      // {
      //   test: /\.scss$/,
      //   include: path.join(__dirname, "resources"),
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //       },
      //     },
      //     "postcss-loader",
      //     "sass-loader",
      //   ],
      // },
      {
        test: /\.scss$/,
        include: path.join(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      // {
      //   test: /\.(eot|svg|ttf|woff)$/,
      //   use: "file-loader",
      // },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./src/castingMonitor/index.html",
    //   filename: "castingMonitor.html",
    //   chunks: ["castingMonitor"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/fflogsUploaderDownload/index.html",
    //   filename: "fflogsUploaderDownload.html",
    //   chunks: ["fflogsUploaderDownload"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/keigennRecord/index.html",
    //   filename: "keigennRecord.html",
    //   chunks: ["keigennRecord"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/keySkillTimer/index.html",
    //   filename: "keySkillTimer.html",
    //   chunks: ["keySkillTimer"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/teamWatch/index.html",
    //   filename: "teamWatch.html",
    //   chunks: ["teamWatch"],
    // }),
    new HtmlWebpackPlugin({
      template: "./src/test/index.html",
      filename: "test.html",
      chunks: ["test"],
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/teamWatch/teamWatchSettings.html",
    //   filename: "teamWatchSettings.html",
    //   chunks: ["teamWatchSettings"],
    // }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 8080,
    static: path.join(__dirname, "dist"),
  },
};
