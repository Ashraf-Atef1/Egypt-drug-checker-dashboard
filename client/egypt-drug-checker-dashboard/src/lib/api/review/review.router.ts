import fetcher from "@/utils/fetcher/fetcher";
import { reviewScheme } from "./review.scheme";
import route from "../routes";

export async function getDrugsReview(
	currentPage: string,
	searchParams: { tradeName?: string } = {}
) {
	const params = {
		page: currentPage,
		limit: "6",
		sortBy: "pharmacology",
		isReviewed: "false",
		...searchParams,
	};
	const queryString = new URLSearchParams(params).toString();
	const res = await fetcher(`${route("drugsReview")}?${queryString}`, {
		cache: "no-store",
	});

	return reviewScheme.parse(res);
}
