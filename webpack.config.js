// used for concatenation of file paths
const path = require('path');
// used to inject webpack as a script tag to the HTML file
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // aliases for importing
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets/index.js'),
            '@components': path.resolve(__dirname, 'src/components/index.js'),
            '@services': path.resolve(__dirname, 'src/services/index.js'),
            '@utils': path.resolve(__dirname, 'src/utils/index.js'),
            '@views': path.resolve(__dirname, 'src/views/index.js'),
        },
    },
    // where to start bundling the javascript files
    entry: path.join(__dirname, "src", "index.js"),
    // create the final bundled file in dist folder in the root of the project
    output: {
        path:path.resolve(__dirname, "dist"),
        publicPath: '/'
    },
    // tell webpack to transpile javascript files using babel before bundling
    module: {
        rules: [
            // import CSS files
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
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
        historyApiFallback: true,
    },
    // This will take the /public/index.html, inject script tag to it and move that HTML file to the dist folder
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "public", "index.html"),
        }),
    ],
}