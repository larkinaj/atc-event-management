// import pkg from 'webpack';
// const { webpack } = pkg;

import path from 'path';
import * as common from './webpack.common.js';
import { merge } from 'webpack-merge';
import HtmlWebPackPlugin from 'html-webpack-plugin';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log('common is: ', common);

// export default 
const dev = merge(common.default, {
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
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      watch: true,
      inject: 'body',
      scriptLoading: 'blocking',
      hash: false,
    }),
    // new webpack.HotModuleReplacementPlugin(),
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

export default dev;

// console.log(JSON.stringify(dev.mode));