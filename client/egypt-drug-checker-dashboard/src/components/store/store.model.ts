export interface IstoreItem {
	name: string;
	price: number;
	type: string;
	_id: string;
}
export interface ImyData {
	coins: number;
	email: string;
	firstName: string;
	isVerified: boolean;
	items: IstoreItem[];
	lastName: string;
	totalCoinsEarned: number;
	totalReviews: number;
	userId: string;
	currentFrame: string;
	userType: "user" | "doctor" | "admin";
}
