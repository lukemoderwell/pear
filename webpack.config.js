const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

module.exports = env => {
  let envKeys = {};
  // call dotenv and it will return an Object with a parsed key
  if (env.production === true) {
    console.log('production build');
    const key = `AIRTABLE_API_KEY=${process.env.AIRTABLE_API_KEY}`;
    fs.writeFileSync('./.env', key);
  }
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  const localEnv = result.parsed;

  // reduce it to a nice object, the same as before
  envKeys = Object.keys(localEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(localEnv[next]);
    return prev;
  }, {});
  return {
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'pear',
        meta: {
          charset: { charset: 'utf-8' },
          viewport: 'width=device-width, initial-scale=1'
        },
        inject: true,
        template: './src/index.html'
      })
    ],
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: path.resolve(__dirname + '/dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist',
      hot: true
    }
  };
};
