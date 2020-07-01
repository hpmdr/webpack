const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const CommonStyleLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
];
module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...CommonStyleLoader],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [...CommonStyleLoader, 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|svg|gif)/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ],
    mode: 'development',
};
