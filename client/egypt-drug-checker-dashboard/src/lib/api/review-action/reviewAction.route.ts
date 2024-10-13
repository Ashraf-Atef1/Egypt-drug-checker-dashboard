import Sfetcher from "@/utils/fetcher/Sfetcher";
import route from "../routes";

export async function getReviewData(reviewId: string) {
	const params = {
		_id: decodeURIComponent(reviewId),
		// status: "pending",
	};
	const queryString = new URLSearchParams(params).toString();
	const res = await Sfetcher(`${route("reviews")}?${queryString}`, {
		cache: "no-store",
	});
	return res;
}
