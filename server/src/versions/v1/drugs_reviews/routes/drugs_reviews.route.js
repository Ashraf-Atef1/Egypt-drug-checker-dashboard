const {
  addDrugReview,
  deleteDrugReview,
  approveDrugReview,
  rejectDrugReview,
  getDrugsReviews
} = require("./drugs_reviews.controller");
const { DrugReviewInput } = require("../model/drugs_reviews.validation");

const DrugReview = require("../model/drugs_reviews.mongo");
const { authenticateToken } = require("../../../../middleware/auth.middleware");
const { validate } = require("../../../../middleware/validate.middleware");
const { findQuery } = require("../../../../helpers/findQuery");

const express = require("express");

const drugsReviewsRoute = express.Router();

drugsReviewsRoute.get("/", authenticateToken(1), async (req, res) => {
  try {
    const result = await findQuery(DrugReview, req.query);
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});
// drugsReviewsRoute.get("/a", authenticateToken(1), async (req, res) => {
//   console.log("getDrugsReviews\n\n");

//     const result = await getDrugsReviews(req, res);
//     // console.log("result\n", result);
//     res.json({
//       message: "Drugs reviews retrieved successfully",
//       result
//     });

// });

drugsReviewsRoute.get("/me", authenticateToken(2), async (req, res) => {
  try {
    const result = await findQuery(DrugReview, {
      ...req.query,
      userId: req.user.userId,
    });
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

drugsReviewsRoute.post(
  "/",
  authenticateToken(2),
  validate(DrugReviewInput),
  addDrugReview
);

drugsReviewsRoute.put("/:id/approve", authenticateToken(1), approveDrugReview);

drugsReviewsRoute.put("/:id/reject", authenticateToken(1), rejectDrugReview);

drugsReviewsRoute.delete("/:id", authenticateToken(0), deleteDrugReview);

module.exports = drugsReviewsRoute;
