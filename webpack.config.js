/*
Webpack configuration file
Watches for changes within webpack-dev-server.

*/

// importing webpack
const webpack = require('webpack');
const path = require('path')

// Enables .env file to be referenced in app.js
const Dotenv = require('dotenv-webpack');

// exporting modules
module.exports = {
  // entry point for app - using app.js located in src folder
  entry: {
    app: ['webpack/hot/dev-server', './src/index.js']
  },
  // bundled files
  output: {
    path: path.resolve(__dirname, './public/built'),
    filename: 'bundle.js',
    publicPath: 'public/built/'
  },

  devServer: {
    contentBase: './public',
    // publicPath: 'http://localhost:8080/built/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      // Including Sass loader to run SCSS
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
    // dot env file for reference in app.js
    new Dotenv({
     path: './.env', //file path
     safe: false
   })
  ]
}
