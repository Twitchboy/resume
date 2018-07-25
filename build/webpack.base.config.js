/**
 * 通用 webpack 配置
 * @fileOverview
 * @author pycoder.Junting
 * @email: 342766475@qq.com
 * @Date: 2018-07-14 11:06:25
 * @Last Modified by: pycoder.Junting
 * @Last Modified time: 2018-07-25 23:29:47
 */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 校验是否是生产环境
const isProd = process.env.NODE_ENV === 'production'

// 解析路径
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: isProd ? process.env.NODE_ENV : 'development',
    //控制是否生成，以及如何生成 source map
    devtool: isProd ? false : '#cheap-module-source-map',
    //构建后输出目录
    output: {
        path: path.resolve(__dirname, '../docs'),
        filename: '[name].[hash:8].js'
    },
    // 解析配置
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': resolve('src'),
            'styles': resolve('src/assets/styles')
        }
    },
    // 处理不同类型模块的配置
    module: {
        rules: [
            // js
            {
                test: /\.jsx$/,
                include: [ // src 目录下的才需要经过 babel-loader 处理
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
            },
            // css
            {
                test: /\.(less|css)$/,
                use: isProd ? ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { minimize: true }
                        },
                        { loader: 'postcss-loader'},
                        { loader: 'less-loader'}
                    ],
                    fallback:'style-loader'
                }) : [
                    { loader: 'style-loader'},
                    { loader: 'css-loader'},
                    { loader: 'postcss-loader' },
                    { loader: 'less-loader'}
                ]
            },
            // file
            {
                test: /\.(png|jpe?g|git|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // 字节限制 10000 一下的进行 base64
                    name: '[name].[ext]?[hash:8]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'static/[name].[ext]?[hash:6]'
                    }
                }
            }
        ]
    },
    // 相关插件配置
    plugins: isProd
    ? [ // 生产环境
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: { warnings: false }
            }
        }),
        // 提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。此插件仅适用于由 webpack 直接处理的 ES6 模块
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({ // 提取 CSS
            filename: 'common.[chunkhash:8].css'
        })
      ]
    : [ // 开发环境
        new FriendlyErrorsPlugin() //能够更好在终端看到 webapck 运行的警告和错误
      ]

}
