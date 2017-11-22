const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './app/typescripts/app.ts'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract([{
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }])
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader'
                }]
            },
            {
                test: /\.json$/,
                use: [{
                    loader: 'json-loader'
                }]
            },
            {
                test: /\.(png|jpg|jpeg|svg)?$/,
                use: [{
                    loader: 'url-loader'
                }]
            },
            {
                test: /\.(ttf|woff|woff2|eot)?$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    plugins: [
        // Copy our app's index.html to the build folder.
        new CopyWebpackPlugin([
            {from: './app/index.html', to: "index.html"}
        ]),
        new ExtractTextPlugin("styles.css")
    ]
};
