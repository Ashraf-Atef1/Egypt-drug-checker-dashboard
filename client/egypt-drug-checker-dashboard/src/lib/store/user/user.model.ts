export interface IstoreItem {
	name: string;
	price: number;
	type: string;
	_id: string;
}
export interface Iuser {
	coins: number | null;
	email: string | null;
	firstName: string | null;
	isVerified: boolean | null;
	items: IstoreItem[];
	lastName: string | null;
	totalCoinsEarned: number | null;
	acceptedReviews: number | null,
	rejectedReviews: number | null,
	totalReviews: number | null;
	userId: string | null;
	currentFrame: string | null;
	userType: "user" | "doctor" | "admin" | null;
	userImage: string | null;
}
