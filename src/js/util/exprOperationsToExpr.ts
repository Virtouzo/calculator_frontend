import _ from "lodash";

/** If this would be a monorepo, this would be put in shared files folder so it could be reused by the server
 * in validation logic. As I was not sure if monorepo was allowed, this code is simply copy pasted to the server side. */

import { Action, ExprOperation } from "../types/types";

const ActionToMathSymbol = {
	[Action.SYMBOL]: "-",
	[Action.MODULO]: "%",
	[Action.FLOAT]: ".",
	[Action.DIVIDE]: "/",
	[Action.MULTIPLY]: "*",
	[Action.PLUS]: "+",
	[Action.MINUS]: "-",
};

export default function exprOperationsToExpr(exprOperations: ExprOperation[]) {
	return exprOperations.reduce((acc, currOp) => {
		if (currOp.action === Action.NUMBER) {
			if (typeof currOp.number !== "number") throw new Error(`Received: ${currOp.number} for action NUMBER.`);

			return acc + currOp.number;
		} else {
			const mathSymbol = ActionToMathSymbol[currOp.action];
			if (!mathSymbol) throw new Error(`Trying to convert action: ${currOp.action} that is not a math action.`);

			return acc + mathSymbol;
		}
	}, "");
}
