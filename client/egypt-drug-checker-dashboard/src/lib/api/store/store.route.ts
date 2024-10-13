import fetcher from "@/utils/fetcher/fetcher";
import route from "../routes";

export async function getStoreItems() {
	const res = await fetcher(route("store"));
	return res;
}

export async function buyItem(itemId: string) {
	const res = await fetcher(`${route("buyItem")}/${itemId}`, {
		method: "POST",
	});
	return res;
}

export async function setFrame(frameName: string) {
	const res = await fetcher(route("setFrame"), {
		method: "PUT",
		body: JSON.stringify({ frameName }),
	});
	return res;
}
