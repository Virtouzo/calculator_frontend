import CommonCfg from "./webpack-configs/webpack-common-config";
import DevHmrCfg from "./webpack-configs/webpack-dev-hmr-config";
import ProdCfg from "./webpack-configs/webpack-prod-config";
import WebpackConfig from "webpack-config";

let FinalConfig = new WebpackConfig();
if (process.env.NODE_ENV === "development") {
	console.log("Compiling DEV HMR config");
	FinalConfig = FinalConfig.merge(CommonCfg).merge(DevHmrCfg);
} else {
	console.log("Compiling by PROD config.");
	FinalConfig = FinalConfig.merge(CommonCfg).merge(ProdCfg);
}

export default FinalConfig;
