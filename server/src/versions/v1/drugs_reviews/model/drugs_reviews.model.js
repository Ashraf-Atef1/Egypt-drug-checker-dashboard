const AuthenticationsCollection = require("../../auth/model/authentication.mongo");
const DrugReview = require("./drugs_reviews.mongo");
const escapeRegExp = require("escape-regexp");

async function getReviewDB(reviewId) {

  const review = await DrugReview.find()
    .populate({ path: 'tradeName', model: 'Drugs_information',
      localField: 'tradeName',
      foreignField: 'tradeName', 
     }).populate({
      path: 'userId',
      model: 'Authentication',
      foreignField: 'userId',

    });
     const user = await AuthenticationsCollection.findById("67066daca845f7af05bd01f1");
console.log(user);
  if (!review) throw new Error("Drug review not found");

  return review;
}

async function addDrugReviewDB(reviewData) {
  const newReview = new DrugReview(reviewData);
  const status = await newReview.save();
  if (!status) throw new Error("Failed to add drug review");
}

async function deleteDrugReviewDB(reviewId) {
  const status = await DrugReview.deleteOne({ _id: reviewId });
  if (status.deletedCount === 0) throw new Error("Drug review not found");
}

async function updateDrugReviewDB(reviewId, updateData) {
  const review = await DrugReview.findById(reviewId);

  if (!review) {
    throw new Error("Drug review not found");
  }

  if (review.status !== "pending") {
    throw new Error("Only pending reviews can be updated");
  }

  const updatedReview = await DrugReview.findByIdAndUpdate(
    reviewId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedReview;
}

module.exports = {
  getReviewDB,
  addDrugReviewDB,
  deleteDrugReviewDB,
  updateDrugReviewDB,
};
