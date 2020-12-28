const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    },    
    entry: "./src/index.js",
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "production",
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        // compress: true,      
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    // options: {
                    //     presets: [
                    //         [
                    //             "@babel/preset-env",
                    //             {targets: "defaults" }
                    //         ]
                    //     ]
                    // }
                }
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    // Disables attributes processing
                    attributes: false,
                    // Minimizar para produccion
                    // minimize: false,
                }
            },
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /styles\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ],
    },
    plugins: [
        // new HtmlWebpackPlugin(), // Generates default index.html
        new HtmlWebpackPlugin({  // Also generate a other.html
            filename: "index.html",
            inject: "body", //inject: false ???
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            // filename: "[name].css",
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets" }
            ]
        }),
        new CleanWebpackPlugin()
    ]
};