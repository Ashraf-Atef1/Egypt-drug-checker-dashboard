const {
  addDrugReviewDB,
  deleteDrugReviewDB,
  updateDrugReviewDB,
  getReviewDB,
} = require("../model/drugs_reviews.model");
const { addCoins } = require("../../auth/model/authentication.model");
const {
  updateDrugsInformationDB,
} = require("../../drugs_informations/model/drugs_informations.model");

async function approveDrugReview(req, res) {
  try {
    const { id } = req.params;
    const reviewData = await updateDrugReviewDB(id, {
      status: "approved",
      doctorFeedback: req.user.userId,
      approvalDate: new Date(),
    });
    await updateDrugsInformationDB(reviewData.tradeName.tradeName, {
      ...reviewData.suggestion,
      isReviewed: true,
    });
    console.log("userid\n", reviewData.userId.userId);
    await addCoins(reviewData.userId.userId, 10, "approved");
    await addCoins(req.user.userId, 10);

    res.status(200).json({ message: "Drug review approved successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function rejectDrugReview(req, res) {
  try {
    const { id } = req.params;
    const review = await updateDrugReviewDB(id, {
      status: "rejected",
      doctorFeedback: req.user.userId,
      approvalDate: new Date(),
    });
    // await addCoins(reviewData.userId.userId, 0, "rejected");
    await addCoins(req.user.userId, 10);
    res
      .status(200)
      .json({ message: "Drug review rejected successfully", review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function addDrugReview(req, res) {
  try {
    req.body.userId = req.user.userId;

    if (["admin", "doctor"].includes(req.user.userType)) {
      const { tradeName, suggestion } = req.body;

      await Promise.all([
        addDrugReviewDB({
          ...req.body,
          status: "approved",
          doctorFeedback: req.body.userId,
        }),
        updateDrugsInformationDB(tradeName, { ...suggestion, isReviewed: true }),
      ]);
      await addCoins(req.body.userId, 20, "direct-accept");
    } else {
      console.log("before addDrugReviewDB\n", req.body);
      await addDrugReviewDB(req.body);
      await addCoins(req.body.userId, 10, "pending");
    }

    res.status(201).json({ message: "Drug review added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteDrugReview(req, res) {
  try {
    await deleteDrugReviewDB(req.params.id);
    res.status(200).json({ message: "Drug review deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function getDrugsReviews(req, res) {
    const result = await getReviewDB();
    return result;
}
module.exports = {
  addDrugReview,
  deleteDrugReview,
  approveDrugReview,
  rejectDrugReview,
  getDrugsReviews,
};
