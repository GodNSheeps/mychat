var packageJson = require('./package.json');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'production',
    context: __dirname,
    entry: [
        './src/app.js'
    ],
    output: {
        path: __dirname + '/build/webpack/META-INF/resources/webjars/' + packageJson.name + '/' + packageJson.version,
        publicPath: '/webjars/' + packageJson.name + '/' + packageJson.version,
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
    }
};