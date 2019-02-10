var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: [
        'babel-polyfill', './src/app.js'
    ],
    output: {
        path: __dirname + "/jsbuild",
        publicPath: '/',
        filename: 'mychat.js'
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            { test: /\.js?$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel-loader' },
            {
                test: /\.scss/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
        ]
    },
    devServer: {
        host: '0.0.0.0',
        hot: true,
        port: '8000',
        historyApiFallback: true
    }
};