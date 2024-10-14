import { z } from "zod";
export const mapZodErrors = (errors: z.ZodIssue[]) => {
  return errors.map((issue) => issue.message).join(", ");
};
