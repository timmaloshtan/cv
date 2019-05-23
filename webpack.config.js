const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {
  const entry = './src/index.js';
  
  const output = {
    path: path.resolve(__dirname, 'docs'),
  };
  
  const devServer = {
    inline: true,
    port: 8080,
  };
  
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.pug'),
      favicon: path.join(__dirname, 'src/images/favicon.png'),
      cache: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
  ];

  const module = {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            },
          },
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
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              publicPath: "./",
              name: 'images/[name].[ext]',
            }
          }
        ],
      }
    ],
  };

  return {
    entry,
    output,
    module,
    plugins,
    devServer,
  }
};