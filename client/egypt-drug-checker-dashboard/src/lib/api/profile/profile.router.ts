import fetcher from "@/utils/fetcher/Sfetcher";
import route from "../routes";

export async function getMyData() {
	const userData = await fetcher(route("myData"));
	const pendingReviews = await fetcher(`${route("myReviews")}?status=rejected`);
	const approvedReviews = await fetcher(
		`${route("myReviews")}?status=approved`
	);
	return { userData, pendingReviews, approvedReviews };
}


export async function getUserData(userId: string) {
	console.log("inside getUserData");
	const userData = await fetcher(`${route("users")}/${userId}`);
	
	return { userData };
}
