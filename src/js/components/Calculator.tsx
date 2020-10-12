import * as React from "react";
import Button from "./Button";
import { observer, useLocalStore } from "mobx-react-lite";
import CalculatorLogic from "../logic/CalculatorLogic";
import { Layout } from "../types/types";

const Calculator: React.FC<{
	layout: Layout;
}> = observer((p) => {
	const LS = useLocalStore(() => ({
		calculatorLogic: new CalculatorLogic(),
	}));

	return (
		<div className="calc">
			<div className="calc__screen">{LS.calculatorLogic.operationsString}</div>
			<div className="calc__btns">
				{p.layout.map((row) => (
					<div key={JSON.stringify(row)} className="calc__btns-row">
						{row.map((op) => (
							<Button
								key={op.text}
								btnWrapClasses={op.btnWrapClasses.join(" ")}
								onClick={() => LS.calculatorLogic.handleOperation(op.stackOperation)}
							>
								{op.text}
							</Button>
						))}
					</div>
				))}
			</div>
		</div>
	);
});
export default Calculator;
