// Webpack running "npm webpack" will run webpack with some default configuration (mode: production, entry: index.js, output file name: main.js)
// To tell webpack to use your configuration you have to use the script "webpack --config <webpack file name>" in the packaje.json file
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  // We don't need mode bause it will be determined by the dev or prod files
  // mode: 'development',

  // path for the start point that runs the entire application
  entry: path.resolve(__dirname, 'client/src/index.js'),

  // We don't need output because it's set up in the prod file and we don't want hashing in our dev file (it's easier in dev to not deal with hashing)
  // output: {
  //   // name of the final bundled file (usually bundle.js or main.js)
  //   // content hash allows you to have a different name when you make changes to the file so that browsers don't retrieve the document from cache unless the file content doesn't change
  //   // (because the hash generated is based on the content of your file, so if it stays the same, hash will be the same)
  //   // but in this case you want to change the script name in the html file every time, so do that we use webpack plugins
  //   filename: 'main.[contentHash].js',
  //   // location where you want to put the bundled files (main.js, index.html ...); template: path.resolve(__dirname, "name of directory")
  //   // dist should have everything we need to build the app, including an assets folder that contains the immages for example, so you need to setup your src file to have all what you'll put in dist
  //   path: path.resolve(__dirname, 'dist'),
  // },
  // You can add devtool: 'none' to make your bundled file more readable when you're using development mode
  module: {
    // Rules is an array where you insert your loaders
    rules: [
      {
        // $ means the file ends with this string (not in the middle of the file)
        // We use the html loader to follow what the html it reading and find where images are for example which then calls file loader

        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        // Once html-loader encounters an image it calls the file loader and it creates a copy of it in the dist folder
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            // the output path is the name of a new file that will get created in the dist folder (that's why you don't need to provide an exact path)
            outputPath: 'imgs',
          },
        },
      },
      {
        test: /.(js|jsx|ts|tsx)$/,
        // test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // will split the css bundling in dev and prod to make some changes in prod mode to make user experience smoother
      // {
      //   test: /\.s?css$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      //   // order matters for the loaders: sass translates sass code to css, css loader translates css into javascript and style-loader takes that translation and injects it into the DOM (which is the step that applies the css code to your page)
      //   // they load in reverse order (sass then css then style)
      // },
    ],
    // devtool: 'source-map',
  },
  // Plugins give us additional functionallity like creating the html for us, cleaning the new main.js files that get created everytime
  // plugins is an array that contains all our plugins
  // we will move plugins to the dev and prod folders so that se could remove the comments and white spaces in the prod version
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     // template should not contain your main.js script at the bottom because webpack will do it for us
  //     // by default, the html file created will be called index.html
  //     template: './src/template.html',
  //   }),
  // ],
};

// const webpack = require('webpack');
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   mode: 'development',
//   entry: path.resolve(__dirname, '/client/index.js'),
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//     publicPath: '/',
//   },
//   module: {
//     rules: [
//       {
//         // test: /.(js|jsx)$/,
//         test: /\.jsx?/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'],
//           },
//         },
//       },
//       {
//         test: /\.s?css/,
//         use: ['style-loader', 'css-loader', 'sass-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: 'development',
//       template: 'index.html',
//     }),
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify(process.env.NODE_ENV),
//       },
//     }),
//   ],
//   //   devServer: {
//   //     static: {
//   //       publicPath: '/build',
//   //       directory: path.resolve(__dirname, 'build'),
//   //     },
//   //     proxy: {
//   //       '/api': {
//   //         target: 'http://localhost:3000',
//   //       },
//   //     },
//   //   },
// };
