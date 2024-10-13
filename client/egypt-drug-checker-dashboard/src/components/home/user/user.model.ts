export interface Iuser {
	name: string;
	userType: "admin" | "doctor" | "user";
	src: string;
	frameName?: string;
}
