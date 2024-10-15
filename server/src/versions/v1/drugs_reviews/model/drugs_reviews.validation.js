const { z } = require("zod");

const suggestionSchema = z.object({});

const drugReviewSchema = z.object({
  tradeName: z.string().min(1, "Drug ID is required"),
  suggestion: suggestionSchema,
  doctorFeedback: z.string().optional(),
  approvalDate: z.date().optional(),
  status: z.enum(["approved", "pending", "rejected"]).optional(),
});

const DrugReviewInput = drugReviewSchema.omit({
  doctorFeedback: true,
  approvalDate: true,
  status: true,
});

module.exports = {
  DrugReviewInput,
};
