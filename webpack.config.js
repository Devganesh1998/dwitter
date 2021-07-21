const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                test: /\.(tsx|ts|jsx|js)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.module\.s(a|c)ss$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: !isProd,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !isProd,
                        },
                    },
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProd,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !isProd,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: isProd ? '[name].[contenthash].style.css' : '[name].css',
            chunkFilename: isProd ? '[id].[contenthash].css' : '[id].css',
        }),
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
