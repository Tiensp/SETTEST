import { DefinePlugin, Configuration } from "webpack";
import "webpack-dev-server";
import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function createServerConfig(): Configuration {
    return {

        name: "server",

        target: "node",

        mode: 'development',

        externalsPresets: {
            node: true
        },

        ignoreWarnings: [
            {
                module: /express/,
                message: /Critical\sdependency:\sthe\srequest\sof\sa\sdependency\sis\san\sexpression/,
            }
        ],

        entry: "./src/server/app.ts",

        output: {
            path: path.resolve(__dirname, "build"),
            filename: "app.js",
        },

        module: {
            rules: [
              {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                  extensions: ['.ts', '.tsx', '.js', '.json'],
                },
                use: 'ts-loader',
              },
            ]
        },

        plugins: [
          new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["!**"]
          })
        ]

    }
} // end server configuration

function createClientConfig(): Configuration {

    const babelConfig = {
        presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript"
        ],
        plugins: [
            "@babel/plugin-transform-runtime"
        ].filter(Boolean)
    }

    return {

        name: "client",

        target: "web",

        mode: 'development',

        entry: {
          index: "./src/client/index.tsx"
        },

        output: {
          path: path.join(__dirname, "/build"),
          filename: "bundle.js",
        },

        module: {
            rules: [
              {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                  extensions: ['.ts', '.tsx', '.js', '.json'],
                },
                use: 'ts-loader',
              },
            ]
        },

        devServer: {
          historyApiFallback: true,
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            }),

            new MiniCssExtractPlugin(),
        ].filter(Boolean),

    };

} // end client configuration

export default function () {

  const clientConfig = createClientConfig();
  const serverConfig = createServerConfig();

  return [clientConfig, serverConfig];

}