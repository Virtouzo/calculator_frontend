import Operation from "../logic/Operation";

/** Represents data needed purely to perform the calculation operation. */
export interface ExprOperation {
	action: Action;
	number?: number;
}

export enum Action {
	CLEAR = "CLEAR",
	SYMBOL = "SYMBOL",
	MODULO = "MODULO",
	DIVIDE = "DIVIDE",
	MULTIPLY = "MULTIPLY",
	MINUS = "MINUS",
	PLUS = "PLUS",
	FLOAT = "FLOAT",
	EQUAL = "EQUAL",
	NUMBER = "NUMBER",
	BACK = "BACK",
}

export enum BtnWrapClass {
	IMPORTANT = "calc__btn-wrap--imp",
	DOUBLE = "calc__btn-wrap--2x",
}

export type Layout = Operation[][];
