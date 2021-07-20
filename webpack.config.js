const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProd ? 'production' : 'development',
    output: {
        publicPath: '/',
        filename: '[name].[contenthash].bundle.js',
        clean: true,
        path: path.resolve(__dirname, 'dist'),
    },
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.(tsx|ts|jsx|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    ...(isProd
        ? {}
        : {
              devServer: {
                  contentBase: path.join(__dirname, 'dist'),
                  port: 4000,
                  open: true,
                  historyApiFallback: true,
                  hot: true,
                  inline: true,
                  watchContentBase: true,
                  liveReload: false,
              },
          }),
};
