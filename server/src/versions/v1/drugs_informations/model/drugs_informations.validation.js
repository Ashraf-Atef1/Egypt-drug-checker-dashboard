const { z } = require("zod");

const drugValidationSchema = z.object({
  tradeName: z.string().min(2, "must be more than 2 characters"),
  genericName: z.string().optional(),
  price: z.number().nonnegative().optional(),
  company: z.string().optional(),
  moreInformation: z.string().optional(),
  route: z.string().optional(),
  isReviewed: z.boolean().default(false),
  interactionName: z.string().optional(),
});

const DrugInput = drugValidationSchema.omit({ isReviewed: true });
const DrugUpdateInput = drugValidationSchema.partial();

module.exports = {
  DrugInput,
  DrugUpdateInput,
};
