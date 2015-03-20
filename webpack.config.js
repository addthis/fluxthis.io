'use strict';

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + "/public/js/"
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            'node_modules',
            'src',
            'docs',
            'public'
        ]
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style?-singleton!css'},
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            { test: /\.jsx?$/, loader: 'babel-loader' },
            { test: /\.md$/, loader: "html!markdown" }
        ]
    }
};