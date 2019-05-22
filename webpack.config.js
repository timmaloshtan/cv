const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './sass/main.scss',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'css/style.css',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              publicPath: "../",
              name: 'img/[name].[ext]',
            }
          }
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.pug',
      filename: 'index.html',
      favicon: 'img/favicon.png',
      cache: false,
    }),
    new ExtractTextPlugin('css/style.css'),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8080,
  },
};
