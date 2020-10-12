import webpack from "webpack";
import path from "path";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

const Config: webpack.Configuration & { devServer: WebpackDevServerConfiguration } = {
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devServer: {
		publicPath: "/assets/compiled/",
		contentBase: [path.resolve("./src/views")],
		hot: true,
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
