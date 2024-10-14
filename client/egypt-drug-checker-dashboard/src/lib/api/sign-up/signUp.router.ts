import fetcher from "@/utils/fetcher/fetcher";
import route from "../routes";

interface IsignUpData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export async function signUp(signUpData: IsignUpData) {
	const res = await fetcher(route("signUp"), {
		method: "POST",
		body: JSON.stringify(signUpData),
	});
	return res;
}
