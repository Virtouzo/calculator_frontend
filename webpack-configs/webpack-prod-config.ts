import OptimizeCssPlugin from "optimize-css-assets-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";

const Config = {
	plugins: [
		new CleanWebpackPlugin(),
		new OptimizeCssPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require("cssnano"),
			cssProcessorPluginOptions: {
				preset: ["default", { discardComments: { removeAll: true } }],
			},
			canPrint: true,
		}),
	],
	devtool: "source-map",
	mode: "production",
	optimization: {
		mangleWasmImports: true,
		nodeEnv: "production",
	},
	devServer: {
		publicPath: "/assets/compiled/",
		contentBase: [path.resolve("./src/views")],
		proxy: [
			{
				context: ["/calculate"],
				target: "http://localhost:8081",
			},
		],
		historyApiFallback: {
			rewrites: [{ from: /./, to: "/index.html" }],
		},
	},
};

export default Config;
