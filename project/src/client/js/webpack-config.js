var path = require('path');

module.exports = {
    devtool: 'source-map',
    mode: "development",
    entry: {
        app: [path.resolve(__dirname, './../tsx') + '/app.tsx'],
        game: [path.resolve(__dirname, './../tsx') + '/game.tsx'],
        new_game: [path.resolve(__dirname, './../tsx') + '/newGame/newGame.tsx']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./../dist/[name]-bundle.js"
    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                include: [
                    path.resolve(__dirname, "./../tsx")
                ],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: './../config/tsconfig.json'
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader","css-loader"],
            }
        ]
    }
}