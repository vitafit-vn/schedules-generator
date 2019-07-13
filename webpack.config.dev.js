const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
    },
    open: true,
    port: 9000,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PUBLIC_PATH: 'http://localhost:9000',
    }),
  ],
});
