import fetcher from "@/utils/fetcher/Sfetcher";
import route from "../routes";

export async function getReviews(currentPage: string) {
	const params = {
		page: currentPage,
		limit: "6",
		sortBy: "createdAt",
		status: "pending",
	};
	const queryString = new URLSearchParams(params).toString();
	const res = await fetcher(`${route("reviews")}?${queryString}`, {
		cache: "no-store",
	});
	return res;
}
