import fetcher from "@/utils/fetcher/fetcher";
import route from "../routes";

export async function getMyData() {
	const res = await fetcher(route("myData"));
	return res;
}

interface IeditData {
	firstName?: string;
	lastName?: string;
	email?: string;
}
export async function setMyData(editData: IeditData) {
	const res = await fetcher(route("myData"), {
		method: "PUT",
		body: JSON.stringify(editData),
	});
	console.log("res inside setMyData", res);
	return res;
}
// interface IeditImaqge{
// 	userId: string;
// 	userImage: string;
// }
export async function setMyImage(userImage: File) {
	const formData = new FormData();
	formData.append("avatar", userImage); // 'image' is the key name for the file
	console.log(userImage);
	const res = await fetcher(route("changeImage"), {
		method: "POST",
		body: formData,
		headers: {
			"Access-Control-Allow-Credentials": "true",
		},
	});
	console.log("res inside setMyImage", res);
	return res;
}

export async function deleteMyImage() {

	const res = await fetcher(`${route("deleteImage")}/me`, {
		method: "PUT",

	});
	return res;
}

export async function deleteUserImage(userId: string) {

	const res = await fetcher(`${route("deleteImage")}/admin`, {
		method: "PUT",
		body: JSON.stringify({userId})

	});
	return res;
}

export async function setImage(userId: string, userImage: File) {
	const formData = new FormData();
	formData.append("avatar", userImage); // 'image' is the key name for the file
	console.log(userImage);
	const res = await fetcher(`${route("changeImage")}/${userId}`, {
		method: "POST",
		body: formData,
		headers: {
			"Access-Control-Allow-Credentials": "true",
		},
	});
	console.log("res inside setImage", res);
	return res;
}
export async function setUserData(userId: string, editData: IeditData) {
	const res = await fetcher(`${route("data")}/${userId}`, {
		method: "PUT",
		body: JSON.stringify(editData),
	});
	console.log("res inside setUserData", res);
	return res;
}
