import { fromError } from "zod-validation-error";
import { headers } from "next/headers";
export default async function fetcher(url: string, options?: RequestInit) {
	try {
		const headerList = headers();
		const cookie = headerList.get("cookie");
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true",
				Cookie: cookie || "",
			},
			credentials: "include",
			...options,
		});
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	} catch (error) {
		throw fromError(error);
	}
}
