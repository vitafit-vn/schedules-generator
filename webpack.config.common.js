const _ = require('lodash');
const glob = require('glob');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');

function generateHTMLPlugins() {
  return glob.sync('./src/*.html').map(dir => {
    const filename = _.last(_.split(dir, '/'));
    const version = `1.0.0-${Math.floor(Date.now() / 1000)}`;

    return new HtmlPlugin({
      filename,
      meta: { version },
      template: dir, // Input
    });
  });
}

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: {
    main: ['./src/app/index.js', './src/style/main.scss'],
    schedules: ['./src/style/schedules.scss'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), './node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src\/app/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/transform-runtime'],
            presets: ['@babel/env'],
          },
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 2 ** 13,
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(otf|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 2 ** 13,
              name: '[name].[ext]',
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin([
      {
        from: './src/static/images',
        to: './images/',
        test: /\.(png|jpg|gif)$/i,
      },
    ]),
    new FaviconsPlugin({
      background: '#0000',
      logo: './src/static/images/logo.png',
      prefix: 'images/favicons/',
      title: 'VitaFit VN',
    }),
    ...generateHTMLPlugins(),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
