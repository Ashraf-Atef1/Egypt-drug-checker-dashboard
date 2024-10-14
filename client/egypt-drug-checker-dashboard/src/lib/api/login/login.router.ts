import fetcher from "@/utils/fetcher/fetcher";
import { requestScheme, userScheme, type TloginData } from "./login.scheme";

import route from "../routes";



export async function login(loginData:  TloginData) {
	const res = await fetcher(route("login"), {
		method: "POST",
		body: JSON.stringify(requestScheme.parse(loginData)),
	});
	return userScheme.parse(res);
}
