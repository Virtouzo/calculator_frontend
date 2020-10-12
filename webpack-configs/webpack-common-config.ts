import path from "path";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ManifestPlugin from "webpack-manifest-plugin";

// all relative paths are calculated from webpack.config.ts location.
const Config: webpack.Configuration = {
	entry: {
		client_bundle: path.resolve("./src/js/index.tsx"),
	},
	output: {
		filename: "[name].js",
		path: path.resolve("./assets/compiled"),
		publicPath: "/assets/compiled/",
	},
	devtool: "eval",
	plugins: [
		new ManifestPlugin(),
		new ForkTsCheckerWebpackPlugin({
			tsconfig: path.resolve("./tsconfig.json"),
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
	resolve: {
		plugins: [
			new TsconfigPathsPlugin({
				configFile: path.resolve("./tsconfig.json"),
			}),
		],
		modules: ["node_modules"],
		extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "resolve-url-loader", "sass-loader?sourceMap"],
				include: [path.resolve("./src/css")],
			},
			{
				test: /\.svg$/,
				use: ["svg-inline-loader"],
				include: path.resolve("./src/img"),
			},
			{
				test: /\.(gif|png|jpg|jpeg)$/,
				loader: "file-loader",
				include: [path.resolve("./src/img")],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				loader: "file-loader",
				include: [path.resolve("./src/fonts")],
			},
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						babelrc: false,
						presets: [
							[
								"@babel/preset-env",
								{ targets: { browsers: "> 0.25%, not dead" } }, // or whatever your project requires
							],
							"@babel/preset-typescript",
							"@babel/preset-react",
						],
						plugins: [
							// plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
							["@babel/plugin-proposal-decorators", { legacy: true }],
							["@babel/plugin-proposal-class-properties", { loose: true }],
							"react-hot-loader/babel",
							"@babel/plugin-transform-runtime",
							"@babel/plugin-proposal-optional-chaining",
						],
					},
				},
			},
		],
	},
};

export default Config;
