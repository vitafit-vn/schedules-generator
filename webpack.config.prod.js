const cssnano = require('cssnano');
const merge = require('webpack-merge');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      canPrint: true,
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
    }),
    new webpack.EnvironmentPlugin({
      PAGE_TITLE: 'VitaFit VN',
      PUBLIC_PATH: 'https://tools.vitafit.vn',
    }),
  ],
});
