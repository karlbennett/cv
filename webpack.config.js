/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";

const webpack = require("webpack");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = (env, { mode }) => {
  const isProd = "production" === mode;
  const isDev = !isProd;
  return {
    mode: mode,
    entry: "./src/index.tsx",
    devtool: isProd ? false : "eval-source-map",
    output: {
      path: path.join(__dirname, "/build"),
      pathinfo: isDev,
      filename: isProd ? "static/js/[name].[contenthash:8].js" : "static/js/bundle.js",
      chunkFilename: isProd ? "static/js/[name].[contenthash:8].chunk.js" : "static/js/[name].chunk.js",
      assetModuleFilename: "static/media/[name].[hash][ext]",
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            {
              test: [/\.jsx?$/, /\.tsx?$/],
              exclude: /node_modules/,
              loader: "babel-loader",
            },
            {
              test: /\.md$/,
              type: "asset/source",
            },
            {
              test: /\.svg$/,
              type: "asset",
            },
            {
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: "asset/resource",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.svgoMinify,
            options: {
              encodeOptions: {
                multipass: true,
                plugins: [
                  "preset-default",
                ],
              },
            },
          },
        }),
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new webpack.DefinePlugin({
        "process.env": {
          "PERSONAL": JSON.stringify(process.env.PERSONAL),
        },
      }),
    ],
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
