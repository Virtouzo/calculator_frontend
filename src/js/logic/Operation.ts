import { BtnWrapClass, ExprOperation } from "../types/types";

/** Full operation object that includes @stackOperation for calculations and other data for front-end representation. */
export default class Operation {
	constructor(
		public readonly stackOperation: ExprOperation,
		public readonly text: string,
		public readonly btnWrapClasses: BtnWrapClass[] = []
	) {}

	public makeDoubleSize() {
		this.btnWrapClasses.push(BtnWrapClass.DOUBLE);
		return this;
	}

	public makeImportant() {
		this.btnWrapClasses.push(BtnWrapClass.IMPORTANT);
		return this;
	}
}
