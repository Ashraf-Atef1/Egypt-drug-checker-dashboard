export interface IleaderBoard {
	pageNumber: string;
}

export interface IstoreItem {
	name: string;
	price: number;
	type: string;
	_id: string;
}
export interface Iuser {
	coins: number;
	email: string;
	firstName: string;
	isVerified: boolean;
	items: IstoreItem[];
	lastName: string;
	totalCoinsEarned: number;
	acceptedReviews: number;
	rejectedReviews: number;
	totalReviews: number;
	userId: string;
	currentFrame: string;
	userType: "user" | "doctor" | "admin";
	userImage: string;
}
