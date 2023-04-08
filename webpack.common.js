// Webpack running "npm webpack" will run webpack with some default configuration (mode: production, entry: index.js, output file name: main.js)
import path from 'path';
// import HtmlWebPackPlugin from 'html-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // We don't need mode bause it will be determined by the dev or prod files
  // mode: 'development',

  // path for the start point that runs the entire application
  entry: path.resolve(__dirname, './src/index.js'),
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
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

    ],
    // devtool: 'source-map',
    },
    resolve: {
      // Enable importing JS / JSX files without specifying their extension
      extensions: [ '.tsx', '.ts', '.jsx', '.js', '...' ],
      fallback: {
          //  "fs": false,
          //  "net": false
      },
    },
    plugins: [
      new NodePolyfillPlugin()
    ],

};


