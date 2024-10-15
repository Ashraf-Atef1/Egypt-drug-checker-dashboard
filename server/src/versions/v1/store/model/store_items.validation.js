const { z } = require("zod");

const storeItemBaseInput = {
  name: z.string().min(1, "Name is required").optional(),
  price: z
    .number()
    .nonnegative("Price must be a non-negative number")
    .optional(),
  // imageUrl: z.string().url("Invalid image URL format").optional(),
  type: z
    .enum(["frame", "badge", "doctor user"], "Type must be either 'frame' or 'badge'")
    .optional(),
};

const storeItemInput = z.object({
  ...storeItemBaseInput,
});

const storeItemUpdateInput = z.object(storeItemBaseInput);

module.exports = {
  storeItemInput,
  storeItemUpdateInput,
};
