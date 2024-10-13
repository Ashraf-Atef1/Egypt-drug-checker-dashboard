export interface IuserCard {
	name: string;
	userType: "admin" | "doctor" | "user";
	imageSrc: string;
	rank: number;
	reviewCount: number;
	acceptedReviewCount: number;
	earnedCoins: number;
	currentFrame: string;
}
