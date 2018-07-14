/**
 * 开发环境 webpack 配置
 * @fileOverview
 * @author pycoder.Junting
 * @email: 342766475@qq.com
 * @Date: 2018-07-14 11:06:25
 * @Last Modified by: pycoder.Junting
 * @Last Modified time: 2018-07-14 20:59:35
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = merge(base, {
    entry: {
        app: './src/entry.js'
    },
    // 本地服务器
    devServer: {
        port: 8001, // 端口
        host: '0.0.0.0', // http://127.0.0.1 或者 内网本机IP，这样别人也能访问
        overlay: { // webpack 编译过程中出现错误都显示再网页上
          errors: true
        },
        // historyFallback: {}, // 访问地址不识别的时候，映射到 index
        open: true, // 打开浏览器窗口
        hot: true // 热更新， 组件修改，只更新组件
    },
    plugins: [
        // 实际的模块热加载，其实需要我们自己在前端写代码去定义的
        new webpack.HotModuleReplacementPlugin(), // 模块热替换插件)
        // 生成 html 入口文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.template.html')
        }),
    ]
})

module.exports = config
