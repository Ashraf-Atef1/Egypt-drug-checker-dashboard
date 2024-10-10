export interface IprofileCard {
	userName: string;
	userImageSrc: string;
	userFrameSrc?: string;
	userType: string;
	userId?: string;
	reviewedDrugs: number;
	acceptedDrugs: number;
	rejectedReviews: number;
	earnedCoins: number;
	email?: string;
	phone?: string;
	editable?: boolean;
	hideHoveringBorder?: boolean;
}
