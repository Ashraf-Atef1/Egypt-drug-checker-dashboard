import { z } from "zod";

export const drugDataScheme = z.object({
	data: z
		.array(
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
		)
		.length(1),
	pagination: z.object({
		totalItems: z.number(),
		totalPages: z.number(),
		currentPage: z.number(),
	}),
});

export const editDrugDataScheme = z.object({
	tradeName: z.string(),
	suggestion: z.object({
		company: z.string(),
		genericName: z.string(),
		route: z.string(),
		moreInformation: z.string(),
		pharmacology: z.string(),
	}),
});

export const editDrugResponseSchema = z.object({
	message: z.literal("Drug review added successfully"),
});
export type TeditDrugData = z.infer<typeof editDrugDataScheme>;


