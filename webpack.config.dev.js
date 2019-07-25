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
    historyApiFallback: true,
    open: true,
    port: 9000,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PAGE_TITLE: 'VitaFit VN',
      // PUBLIC_PATH: 'http://localhost:9000',
      PUBLIC_PATH: 'https://tools.vitafit.vn',
    }),
  ],
});
