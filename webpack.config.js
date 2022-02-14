// used for concatenation of file paths
const path = require('path');
// used to inject webpack as a script tag to the HTML file
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// used to add .env file
const Dotenv = require('dotenv-webpack');
// Copy public files to build folder
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    // aliases for importing
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@assets$': path.resolve(__dirname, 'src/assets/index.js'),
            '@components$': path.resolve(__dirname, 'src/components/index.js'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@services$': path.resolve(__dirname, 'src/services/index.js'),
            '@utils$': path.resolve(__dirname, 'src/utils/index.js'),
            '@views$': path.resolve(__dirname, 'src/views/index.js'),
        },
    },
    // where to start bundling the javascript files
    entry: path.join(__dirname, "src", "index.js"),
    // create the final bundled file in build folder in the root of the project
    output: {
        path:path.resolve(__dirname, "build"),
        publicPath: '/',
        filename: '[name].[contenthash].js'
    },
    // tell webpack to transpile javascript files using babel before bundling
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            // import CSS files
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            // import images
            {
                test: /\.(png|jp(e*)g|svg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]'],
            },
            // import svg as component
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            // babel rules
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env', // transpiling ES2015+ syntax
                            '@babel/preset-react' // transpiling react code
                        ]
                    }
            }
        }]
    },
    devServer: {
        allowedHosts: [
            'provas.rafaeljesusaraiva.pt'
        ],
        historyApiFallback: true,
    },
    // This will take the /public/index.html, inject script tag to it and move that HTML file to the dist folder
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "public", "index.html"),
        }),
        new Dotenv(),
        // new BundleAnalyzerPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: 'public' }]
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000
        },
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    },
                },
            }),
            (compiler) => {
                const TerserPlugin = require('terser-webpack-plugin');
                new TerserPlugin({
                  terserOptions: {
                    compress: {},
                  }
                }).apply(compiler);
            },
        ],
    },
}
