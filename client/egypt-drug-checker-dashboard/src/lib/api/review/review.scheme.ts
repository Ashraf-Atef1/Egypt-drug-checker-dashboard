import { z } from "zod";

export const reviewScheme = z.object({
	data: z.array(
		z.object({
			tradeName: z.string(),
			genericName: z.string(),
			price: z.number(),
			pharmacology: z.string(),
			company: z.string(),
			moreInformation: z.string(),
			route: z.string(),
			isReviewed: z.literal(false),
			interactionName: z.string(),
		})
	),
	pagination: z.object({
		totalItems: z.number(),
		totalPages: z.number(),
		currentPage: z.number(),
	}),
});
