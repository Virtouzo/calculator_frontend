import { action, computed, observable, toJS } from "mobx";
import { Action, ExprOperation } from "../types/types";
import Operations from "../util/Operations";
import arithmeticOperators from "../util/arithmeticOperators";
import Requestor from "../util/Requestor";
import exprOperationsToExpr from "../util/exprOperationsToExpr";
import _ from "lodash";

export default class CalculatorLogic {
	@observable
	private exprOperations: ExprOperation[] = [];

	private async calculate(): Promise<void> {
		const res = await Requestor.post("/calculate", {
			exprOperations: this.exprOperations,
		});
		if (res) {
			this.exprOperations = res.exprOperations;
		}
	}

	@computed
	public get operationsString(): string {
		return exprOperationsToExpr(this.exprOperations);
	}

	private getCurrNumber(withSymbol?: boolean): ExprOperation[] {
		if (this.exprOperations.length > 0) {
			const lastIndex = _.findLastIndex(this.exprOperations, (exprOp) =>
				arithmeticOperators.includes(exprOp.action)
			);
			let currNumberOps = lastIndex === -1 ? this.exprOperations : this.exprOperations.slice(lastIndex + 1);
			currNumberOps = [...currNumberOps]; // we dont want to affect original exprOperations with shift and other operations;
			if (!withSymbol && currNumberOps.length > 0 && currNumberOps[0].action === Action.SYMBOL) {
				currNumberOps.shift(); // remove symbol, so we are left with pure number;
			}
			return currNumberOps;
		}
		return [];
	}

	@action
	public async handleOperation(op: ExprOperation): Promise<void> {
		switch (op.action) {
			case Action.CLEAR: {
				this.exprOperations = [];
				break;
			}
			case Action.EQUAL: {
				if (this.exprOperations.length === 0) return;
				this.calculate();
				break;
			}
			case Action.SYMBOL: {
				const currNumOps = this.getCurrNumber(true);
				const firstOp = currNumOps[0];
				let realFirstOpIndex = this.exprOperations.indexOf(firstOp);
				if (firstOp && firstOp.action === Action.SYMBOL) {
					this.exprOperations.splice(realFirstOpIndex, 1);
				} else if (realFirstOpIndex === -1) {
					this.exprOperations.push(op);
				} else {
					this.exprOperations.splice(realFirstOpIndex, 0, op);
				}
				break;
			}
			case Action.BACK: {
				this.exprOperations.pop();
				break;
			}
			case Action.FLOAT: {
				const currNumberOps = this.getCurrNumber();
				if (currNumberOps.length === 0) {
					this.exprOperations.push(Operations.NUMBER(0).stackOperation);
					this.exprOperations.push(op);
				} else {
					const currNumberOps = this.getCurrNumber();
					const lastOp = currNumberOps.slice(-1)[0];
					if (!currNumberOps.find((op) => op.action === Action.FLOAT)) {
						this.exprOperations.push(op);
					} else if (lastOp.action === Action.FLOAT) {
						this.exprOperations.pop();
					}
				}
				break;
			}
			case Action.MODULO:
			case Action.MULTIPLY:
			case Action.DIVIDE:
			case Action.PLUS:
			case Action.MINUS: {
				const lastOp = this.exprOperations.slice(-1)[0];
				if (this.exprOperations.length === 0) return;
				console.log("lastOp: ", lastOp);
				if ([...arithmeticOperators, Action.SYMBOL, Action.FLOAT].includes(lastOp.action)) return;
				this.exprOperations.push(op);
				break;
			}
			case Action.NUMBER: {
				const currNumberOps = this.getCurrNumber();
				if (
					currNumberOps.length === 1 &&
					currNumberOps[0].action === Action.NUMBER &&
					currNumberOps[0].number === 0
				) {
					// dont allow to enter any other number, if current number's first digit is zero;
					return;
				}

				this.exprOperations.push(op);
				break;
			}
			default: {
				throw new Error(`Invalid action: ${op.action}`);
			}
		}
	}
}
