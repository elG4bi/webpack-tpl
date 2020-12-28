const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        // compress: true,      
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    // Disables attributes processing
                    attributes: false,
                    // Minimizar para produccion
                    // minimize: false,
                }
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg)$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             // options: {
            //             //     emitFile: true,
            //             //     esModule: false,
            //             //     name: 'assets/[name].[ext]'
            //             // }
            //         },
            //     ],
            // },
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ],
    },
    optimization: {
        minimize: false,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        // new HtmlWebpackPlugin(), // Generates default index.html
        new HtmlWebpackPlugin({  // Also generate a other.html
            filename: 'index.html',
            inject: 'body', //inject: false ???
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // filename: '[name].[contenthash].css',
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets" }
            ]
        })
    ]
};