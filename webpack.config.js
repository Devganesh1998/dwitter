const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
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
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[path][name][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    },
                },
            },
            { test: /\.txt$/, type: 'asset/source' },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'html-template/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: isProd ? '[name].[contenthash].style.css' : '[name].css',
            chunkFilename: isProd ? '[id].[contenthash].css' : '[id].css',
        }),
        new ForkTsCheckerWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'),
                    to: '[path][name][ext]',
                },
            ],
        }),
        ...(isProd
            ? [
                  new CompressionPlugin({
                      filename: '[path][base].gz',
                      algorithm: 'gzip',
                      test: /\.(js|css|html|png)$/,
                      minRatio: 0.8,
                  }),
              ]
            : []),
    ],
    devtool: 'inline-source-map',
    ...(isProd
        ? {
              devtool: 'source-map',
          }
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
