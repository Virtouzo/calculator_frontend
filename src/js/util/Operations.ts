import Operation from "../logic/Operation";
import { Action } from "../types/types";

/** Just convenience object, that would help to create many different layouts faster by calling props, instead of writing the boilerplate of new Operation(...) */
const Operations = {
	[Action.CLEAR]: new Operation({ action: Action.CLEAR }, "C"),
	[Action.SYMBOL]: new Operation({ action: Action.SYMBOL }, "-/+"),
	[Action.MODULO]: new Operation({ action: Action.MODULO }, "%"),
	[Action.DIVIDE]: new Operation({ action: Action.DIVIDE }, "/"),
	[Action.MULTIPLY]: new Operation({ action: Action.MULTIPLY }, "x"),
	[Action.MINUS]: new Operation({ action: Action.MINUS }, "-"),
	[Action.PLUS]: new Operation({ action: Action.PLUS }, "+"),
	[Action.EQUAL]: new Operation({ action: Action.EQUAL }, "="),
	[Action.FLOAT]: new Operation({ action: Action.FLOAT }, "."),
	[Action.BACK]: new Operation({ action: Action.BACK }, "DELETE LAST"),
	[Action.NUMBER]: (num: number) => new Operation({ action: Action.NUMBER, number: num }, String(num)),
};
export default Operations;
