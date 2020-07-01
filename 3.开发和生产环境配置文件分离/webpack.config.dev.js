/*
* 开发环境配置
* */
const meger = require('webpack-merge');
const base = require('./webpack.config.base.js');

module.exports = meger(base, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map'
});
