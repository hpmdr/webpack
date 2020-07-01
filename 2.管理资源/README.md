##webpack默认只会处理js文件，如何处理其他资源

###处理样式资源
####最基本的处理
 由于webpack默认只打包js文件，我们需要样式资源导入到入口js文件中,处理其他文件就需要使用各种loader   
##### 1.在入口文件 ‘index.js’中引入样式文件
```javascript
//index.js中的内容
import './style/index.css'
```
##### 2.在配置文件中添加相应的loader  
在如下配置文件中，module的rules属性是一个数组，用于设置各种文件需要使用到的loader。其中处理 '.css'文件就用了‘css-loader’和‘style-loader’
+ ‘css-loader’ 将 CSS 转化成 CommonJS 模块，不然js文件是无法import css文件的
+ ‘style-loader’则在代码运行时，把js中的样式抽取出来，以\<style\>标签的形式插入html文件，让样式生效  
处理less资源则需要先使用‘less-loader’把less文件转换成css文件，然后再由‘css-loader’和‘style-loader’依次处理
```javascript
//webpack.config.js
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {//多个loader的执行顺序是数组逆序，如下则是先执行css-loader在执行style-loader
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
        ]
    },
    plugins: [],
    mode: 'development'
};
```
#### 压缩并独立抽取出样式资源为单独文件
* 使用mini-css-extract-plugin插件抽取出样式资源为独立文件，此插件内置了一个loader，用于提取css文件
* 使用optimize-css-assets-webpack-plugin插件来压缩样式文件
```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//复用样式处理loader
const CommonStyleLoader = [MiniCssExtractPlugin.loader, 'css-loader'];
module.exports = {
    entry: './src/index.js',
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...CommonStyleLoader]
            },
            {
                test: /\.less$/,
                use: [...CommonStyleLoader, 'less-loader']
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css',//css文件输出目录
        }),
        //压缩输出的css文件
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'production'
};
```
#### 为css文件做兼容性处理
为了兼容各式各样的浏览器，需要对css做兼容性处理，这里使用到postcss-loader
