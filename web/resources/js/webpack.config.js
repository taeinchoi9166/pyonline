const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    externals : {
      ace: 'ace'
    },
    mode: 'production'
}