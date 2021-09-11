// used for concatenation of file paths
const path = require('path');
// used to inject webpack as a script tag to the HTML file
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // where to start bundling the javascript files
    entry: path.join(__dirname, "src", "index.js"),
    // create the final bundled file in dist folder in the root of the project
    output: {
        path:path.resolve(__dirname, "dist"),
    },
    // tell webpack to transpile javascript files using babel before bundling
    module: {
        rules: [{
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
    // This will take the /public/index.html, inject script tag to it and move that HTML file to the dist folder
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "src", "index.html"),
        }),
    ],
}