const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        vendor: ['html2canvas', 'jspdf']
    },
    output: {
        path: path.join(__dirname, '../docs'),
        filename: 'dll/[name]_dll.js',
        library: '_dll_[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../docs/dll', 'manifest.json'),
            name: '_dll_[name]',
        }),
    ]
};
