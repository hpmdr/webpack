/*
* 生产环境配置
* */

const meger = require('webpack-merge');
const base = require('./webpack.config.base.js');

module.exports = meger(base, {
    mode: 'production',
    devtool: 'source-map'
});
