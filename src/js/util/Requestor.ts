import Requests, { Resp } from "../types/requests";

export default class Requestor {
	public static async post<Url extends keyof Requests>(
		url: Url,
		body: Requests[Url]["req"]
	): Promise<Requests[Url]["res"] | void> {
		const res = await fetch(url, {
			body: JSON.stringify(body),
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const resJson = (await res.json()) as Resp<Url>;

		if (resJson.success) {
			return resJson.data;
		} else {
			alert(resJson.message);
		}
	}
}
