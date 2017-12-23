module.exports = {
    entry: __dirname+'/app.ts',
    output: {
      filename: 'bundle.js',
      path: __dirname+'/dist'
    },
    target: "node",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: __dirname+/node_modules/
        },{
            test: /\.ts?$/,
            loader: 'ts-loader',
            exclude: __dirname+/node_modules/
          },
      ]
    },
    resolve: {
      extensions: [".ts",".tsx", ".js"]
    }
};