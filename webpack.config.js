/*
Webpack configuration file
Watches for changes within webpack-dev-server.

*/

// importing webpack
const webpack = require('webpack');

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
    path: './public/built',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },

  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      // Including Sass loader to run SCSS
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
    // dot env file for reference in app.js
    new Dotenv({
     path: './.env', //file path
     safe: false
   })
  ]
}
