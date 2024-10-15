const AuthenticationsCollection = require("../../auth/model/authentication.mongo");
const DrugsInforamtionsCollection = require("../../drugs_informations/model/drugs_informations.mongo");
const DrugReview = require("../../drugs_reviews/model/drugs_reviews.mongo");

async function getHomeData(userId) {
    const ReviewsData = {
        totalDrugs: await DrugsInforamtionsCollection.countDocuments(),
        totalReviews: await DrugReview.countDocuments(),
        totalApprovedReviews: await DrugReview.countDocuments({ status: "approved" }),
        totalRejectedReviews: await DrugReview.countDocuments({ status: "rejected" }),
    }

    const yourRank = {
        yourRank: await AuthenticationsCollection.find({ totalCoinsEarned: { $gt: (await AuthenticationsCollection.findOne({ userId })).totalCoinsEarned } }).countDocuments() + 1,
        totalUsers: await AuthenticationsCollection.countDocuments()
    }
    const leaderBoard = await AuthenticationsCollection.find().sort({ totalCoinsEarned: -1 }).limit(6);
    const drugsToReview = await DrugsInforamtionsCollection.find({ isReviewed: false }).sort({ pharmacology: 1 }).limit(6);
    return { ReviewsData, yourRank, leaderBoard, drugsToReview };
}

module.exports = {
    getHomeData
}