import React from "react";
import { hot } from "react-hot-loader/root";
import Calculator from "./components/Calculator";
import layout from "./constants/Layout";

const App: React.FC<{}> = () => {
	return <Calculator layout={layout} />;
};

export default hot(App);
