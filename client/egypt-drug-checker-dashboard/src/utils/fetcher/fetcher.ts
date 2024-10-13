import { fromError } from "zod-validation-error";

export default async function fetcher(url: string, options?: RequestInit) {
	try {
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true",
			},
			credentials: "include",
			...options,
		});
		// if (!response.ok) {
		// 	throw new Error(response.statusText);
		// }
		const res = await response.json();

		// return response.json();
		return res;
	} catch (error) {
		throw fromError(error);
	}
}
