/*
* 开发环境和生产环境通用的基本配置
* */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    entry: {
        app: './src/index.js',
        util: './src/util.js'
    },
    output: {
        filename: "[name].[chunkhash:7].js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['dist']
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: true
        }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    mode: 'production',
};
