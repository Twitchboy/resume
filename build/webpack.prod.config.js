/**
 * 生产环境 webpack 配置
 * @fileOverview
 * @author pycoder.Junting
 * @email: 342766475@qq.com
 * @Date: 2018-07-14 11:06:25
 * @Last Modified by: pycoder.Junting
 * @Last Modified time: 2018-07-26 21:18:22
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

const config = merge(base, {
    entry: {
        app: './src/entry.js',
        vender: './src/vender.js'
    },
    externals: {
        'html2canvas': 'html2canvas',
        'jsPDF': 'jspdf'
    },
    plugins: [
        // 生成 html 入口文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.template.html')
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
            algorithm: 'gzip',//算法
            test: new RegExp(
                 '\\.(js|css)$'    //压缩 js 与 css
            ),
            threshold: 10240,//只处理比这个值大的资源。按字节计算
            minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
       })
    ]
})

module.exports = config
