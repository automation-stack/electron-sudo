import fs from 'fs';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';


let nodeModules = fs.readdirSync('./node_modules')
    .filter((module) => {
        return module !== '.bin';
    })
    .reduce((prev, module) => {
        return Object.assign(prev, {[module]: 'commonjs ' + module});
    }, {}),
    srcPath = './src/', distPath = './dist';

export default {
    entry: [`${srcPath}/index.js`],
    output: {
        path: distPath,
        filename: 'index.js',
        library: 'electron-sudo',
        libraryTarget: 'umd'
    },
    target: 'electron',
    debug: false,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/node_modules/),
        new CopyWebpackPlugin([
            {from: `${srcPath}/bin`, to: './bin'}
        ])
    ],
    node: {
        //do not include polyfills...
        //http://webpack.github.io/docs/configuration.html#node
        console: false,
        process: false,
        child_process: false,
        global: false,
        buffer: false,
        crypto: false,
        __filename: false,
        __dirname: true
    },
    externals: nodeModules
};
