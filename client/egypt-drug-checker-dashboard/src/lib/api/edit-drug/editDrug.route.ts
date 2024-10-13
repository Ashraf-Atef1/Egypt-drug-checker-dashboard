import fetcher from "@/utils/fetcher/fetcher";
import {
	drugDataScheme,
	editDrugDataScheme,
	editDrugResponseSchema,
	type TeditDrugData,
} from "./editDrug.scheme";
import route from "../routes";

export async function getDrugData(tradeName: string) {
	const params = {
		tradeName: decodeURIComponent(tradeName),
		limit: "1",
	};
	console.log("params\n", params);
	const queryString = new URLSearchParams(params).toString();
	const res = await fetcher(`${route("drugsReview")}?${queryString}`, {
		cache: "no-store",
	});
	console.log("response\n", res, `${route("drugsReview")}?${queryString}`);
	return drugDataScheme.parse(res);
}

export async function editDrugData(editDrugData: TeditDrugData) {
	const res = await fetcher(route("sendReview"), {
		method: "POST",
		body: JSON.stringify(editDrugDataScheme.parse(editDrugData)),
	});
	return editDrugResponseSchema.parse(res);
}
