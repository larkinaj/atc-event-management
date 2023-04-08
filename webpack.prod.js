// const path = require('path');
// const common = require('./webpack.common');
// const { merge } = require('webpack-merge');
// // const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

import HtmlWebPackPlugin from 'html-webpack-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import * as common from './webpack.common.js';
import { merge } from 'webpack-merge';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common.default, {
  // We can get rid of anything common between the dev file and the prod file because we'll get that from the common file
  // To do this we need to install weback-merge and import the common file and import the function that will merge the two files.
  mode: 'production',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist/'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    // allows you to bundle all the css together without passing it to the dom so that the page doesn't load just html and then load the css a fraction of the second later (everything at once for a smooth experience)
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    // new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  // minify css
  // using this plugin overrides the js minifier that is already included in webpack, so we have to manually add it again (require(terser-webpack-plugin))
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
  },
});
