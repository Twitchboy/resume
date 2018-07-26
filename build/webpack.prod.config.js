/**
 * 生产环境 webpack 配置
 * @fileOverview
 * @author pycoder.Junting
 * @email: 342766475@qq.com
 * @Date: 2018-07-14 11:06:25
 * @Last Modified by: pycoder.Junting
 * @Last Modified time: 2018-07-27 00:23:08
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = merge(base, {
    entry: {
        app: './src/entry.js',
        html2canvas: 'html2canvas',
        jsPDF: 'jspdf'
    },
    plugins: [
        // 生成 html 入口文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.template.html')
        })
    ]
})

module.exports = config
