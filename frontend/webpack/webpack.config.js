const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require("dotenv-webpack");
const prod = process.env.NODE_ENV === 'production';
module.exports = {
    mode: prod ? 'production' : 'development',
    entry: path.resolve(__dirname, '..', './src/index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            name:"[name].[ext]",
                            outputPath:"files/",
                        },
                    }
                ]
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                type: 'asset/inline'
            },
            {
                test: /\.(pdf)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: '/files/'
                    }
                  }
                ]
              },     
        ]
    },
    output: {
        path: path.resolve(__dirname, '..', './build'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        static: './public'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './public/index.html')
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new Dotenv(),
    ],
    stats: 'errors-only'
};
