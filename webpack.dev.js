const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  // We can get rid of anything common between the dev file and the prod file because we'll get that from the common file
  // To do this we need to install weback-merge and import the common file and import the function that will merge the two files.
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    // public path necessary for historyApitFallback to serve all your files for react router an not only the first sub-path
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'client/src/index.html'),
      // watch: true,
      // inject: 'body',
      // scriptLoading: 'blocking',
      // hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    proxy: {
      // '/': {
      //   target: 'http://localhost:3000/',
      //   secure: false,
      // },
      // '/api/**' means that it will take any url that starts with /api redirect it to local host 3000, if it was just '/api' then only the requests that end with api will be handled and we dont want that.
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false,
      },
      // '/assets/**': {
      //   target: 'http://localhost:3000/',
      //   secure: false,
      // },
    },
    // makes it so that webpack can serve all your routes essential for using react router
    historyApiFallback: true,
    hot: true,
    open: true,
    liveReload: true,
    port: 8080,
  },
});
