import fs from 'fs';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ShellPlugin from 'webpack-shell-plugin';

let nodeModules = fs.readdirSync('./node_modules')
    .filter((module) => {
        return module !== '.bin';
    })
    .reduce((prev, module) => {
        return Object.assign(prev, {[module]: 'commonjs ' + module});
    }, {}),
    srcPath = './src/',
    distPath = './dist',
    babelNode = './node_modules/babel-cli/bin/babel-node.js';

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
    //devtool: 'source-map',
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
        new webpack.BannerPlugin(
            'require("source-map-support").install();',
            { raw: false, entryOnly: true }
        ),
        new CopyWebpackPlugin([
            {from: `${srcPath}/bin`, to: './bin'}
        ]),
        new ShellPlugin({
            onBuildExit: [
                `node ${babelNode} ./webpack/chmod.js ` +
                    `${distPath}/bin/applet.app ` +
                    `${distPath}/bin/applet.app/Contents/MacOS/applet ` +
                    `${distPath}/bin/gksudo`,
            ]
        })
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
        __filename: true,
        __dirname: true
    },
    externals: nodeModules
};
