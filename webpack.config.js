const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = env => {
  let envKeys = {};
  // call dotenv and it will return an Object with a parsed key
  if (env.production !== true) {
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
  }
  return {
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new webpack.HotModuleReplacementPlugin()
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
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist',
      hot: true
    }
  };
};
