import { Layout } from "../types/types";
import Operations from "../util/Operations";

const layout: Layout = [
	[Operations.CLEAR, Operations.SYMBOL, Operations.MODULO, Operations.DIVIDE.makeImportant()],
	[Operations.NUMBER(9), Operations.NUMBER(8), Operations.NUMBER(7), Operations.MULTIPLY.makeImportant()],
	[Operations.NUMBER(6), Operations.NUMBER(5), Operations.NUMBER(4), Operations.MINUS.makeImportant()],
	[Operations.NUMBER(3), Operations.NUMBER(2), Operations.NUMBER(1), Operations.PLUS.makeImportant()],
	[Operations.NUMBER(0).makeDoubleSize(), Operations.FLOAT, Operations.EQUAL.makeImportant()],
	[Operations.BACK.makeImportant()],
];

export default layout;
