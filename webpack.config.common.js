const glob = require('glob');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');

function getNameFromDir(dir) {
  const lastSlash = dir.lastIndexOf('/');
  return dir.slice(lastSlash + 1);
}

function generateHTMLPlugins() {
  return glob.sync('./src/*.html').map(
    dir => new HtmlPlugin({
      filename: getNameFromDir(dir), // Output
      meta: {
        version: `1.0.0-${Math.floor(Date.now() / 1000)}`,
      },
      template: dir, // Input
    }),
  );
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
        test: /\.(png|jpg|gif|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 2 ** 13,
              name: '[name].[ext]',
              outputPath: 'static',
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
        from: './src/partials/',
        to: './partials/',
        test: /\.html$/,
      },
      {
        from: './src/scripts/',
        to: './scripts/',
        test: /\.js$/,
      },
    ]),
    new FaviconsPlugin({
      background: '#000',
      logo: './src/static/images/logo.png',
      prefix: 'static/favicons/',
      title: 'VitaFit VN',
    }),
    ...generateHTMLPlugins(),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
