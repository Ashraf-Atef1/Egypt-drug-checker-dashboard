import { z } from "zod";

export const requestScheme = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});
export const userScheme = z.object({
	message: z.literal("User logged in successfully"),
	user: z.object({
		coins: z.number(),
		email: z.string().email(),
		firstName: z.string(),
		lastName: z.string(),
		isVerified: z.boolean(),
		items: z.array(z.object({})),
		totalCoinsEarned: z.number(),
		userId: z.string(),
		userType: z.enum(["admin", "doctor", "user"]),
	}),
});
export type TloginData = z.infer<typeof requestScheme>;
