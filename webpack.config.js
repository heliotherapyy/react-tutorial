var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './public/scripts/example.js',
    output: { path: path.join(__dirname, 'public'), filename: 'bundle.js' },
    module : {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                },
            }
        ]
    },
    node: {
      fs: "empty"
    }

};
