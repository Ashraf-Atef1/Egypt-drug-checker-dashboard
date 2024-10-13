import fetcher from "@/utils/fetcher/Sfetcher";
import route from "../routes";

export async function getUsers(currentPage: string) {
	const params = { page: currentPage, limit: "6", sortBy: "firstName" };
	const queryString = new URLSearchParams(params).toString();
	const res = await fetcher(`${route("leaderBoard")}?${queryString}`, {
		cache: "no-store",
	});
	return res;
}
