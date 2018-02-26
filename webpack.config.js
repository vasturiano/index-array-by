const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'indexby.js',
        libraryTarget: 'umd',
        library: 'indexBy'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};