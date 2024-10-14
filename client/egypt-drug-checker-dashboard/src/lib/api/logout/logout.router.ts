import fetcher from "@/utils/fetcher/fetcher";
import route from "../routes";

export async function logOut() {
	const res = await fetcher(route("logout"));
	return res;
}
