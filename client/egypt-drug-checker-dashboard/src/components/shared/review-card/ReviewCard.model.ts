import { UrlObject } from "url";

export interface IreviewCard {
	buttonType?: "full" | "contained";
	reviewerName?: string;
	tradeName: string;
	genericName: string;
	pharmacology: string;
	buttonTitle?: string;
	hideButton?: boolean;
	hideHoveringBorder?: boolean;
	to?: string | UrlObject;
}
