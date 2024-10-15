const { z } = require("zod");

const authenticationValidationSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message:
          "First name is required and must be at least 2 characters long.",
      })
      .refine((value) => value.trim().length > 0, {
        message: "First name cannot be empty.",
      }),

    lastName: z
      .string()
      .min(2, {
        message:
          "Last name is required and must be at least 2 characters long.",
      })
      .refine((value) => value.trim().length > 0, {
        message: "Last name cannot be empty.",
      }),

    email: z.string().email({ message: "Must be a valid email address." }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .refine((value) => value.trim().length > 0, {
        message: "Password cannot be empty.",
      }),

    imageUrl: z.string().url({ message: "Must be a valid URL." }).optional(),
  })
  .strict();

const signupInput = authenticationValidationSchema;

const loginInput = z
  .object({
    email: z.string().email({ message: "Must be a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .refine((value) => value.trim().length > 0, {
        message: "Password cannot be empty.",
      }),
  })
  .strict();

const updateUserInput = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message:
          "First name is required and must be at least 2 characters long.",
      })
      .refine((value) => value.trim().length > 0, {
        message: "First name cannot be empty.",
      }).optional(),

    lastName: z
      .string()
      .min(2, {
        message:
          "Last name is required and must be at least 2 characters long.",
      })
      .refine((value) => value.trim().length > 0, {
        message: "Last name cannot be empty.",
      }).optional(),

    email: z.string().email({ message: "Must be a valid email address." }).optional(),

    // imageUrl: z.string().url({ message: "Must be a valid URL." }).optional(),
  })
  .strict();

module.exports = {
  signupInput,
  loginInput,
  updateUserInput,
};
