import { ExprOperation } from "./types";

export type Resp<Url extends keyof Requests> =
	| {
			success: true;
			data: Requests[Url]["res"];
	  }
	| {
			success: false;
			message: string;
	  };

export default interface Requests {
	"/calculate": {
		req: {
			exprOperations: ExprOperation[];
		};
		res: {
			exprOperations: ExprOperation[];
		};
	};
}
