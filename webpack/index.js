const path = require('path');
const webpack = require('webpack');
const { smart: merge } = require('webpack-merge');
const ReportBundleSize = require('../lib/report-bundle-size');
const { root } = require('../config');

const reportBundleSize = new ReportBundleSize({ configCount: 2 });

const prod = process.env.NODE_ENV === 'production';

const common = ({ platform }) => ({
    name: platform,
    mode: process.env.NODE_ENV,
    output: {
        publicPath: '/assets/javascript/',
        path: require('../config').dist,
    },
    stats: 'errors-only',
    devtool:
        process.env.NODE_ENV === 'production'
            ? 'sourcemap'
            : 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['desvg-loader/preact', 'svg-loader'],
            },
            {
                // make sure webpack tree-shakes this stuff
                // https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free
                include: [
                    path.resolve(root, 'packages', 'guui'),
                    path.resolve(root, 'packages', 'pasteup'),
                ],
                sideEffects: false,
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            h: ['preact', 'h'],
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        prod && reportBundleSize,
    ].filter(Boolean),
    resolve: {
        alias: {
            // for libs that expect React
            react: 'preact',
        },
    },
});

module.exports = Promise.all(
    ['browser', 'server'].map(async platform =>
        merge(
            await require(`./${platform}`)(),
            common({
                platform,
            }),
        ),
    ),
);