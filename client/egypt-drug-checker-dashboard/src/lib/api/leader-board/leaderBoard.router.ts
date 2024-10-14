import fetcher from "@/utils/fetcher/fetcher";
import route from "../routes";

export async function getLeaderBoard(currentPage: string) {
	const params = { page: currentPage, limit: "6", sortBy: "totalCoinsEarned" };
	const queryString = new URLSearchParams(params).toString();
	const res = await fetcher(`${route("leaderBoard")}?${queryString}`, {
		cache: "no-store",
	});
	return res;
}
