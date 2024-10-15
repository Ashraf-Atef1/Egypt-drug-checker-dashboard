const mongoose = require("mongoose");

const drugReviewSchema = new mongoose.Schema(
  {
    tradeName: {
      type: String,
      ref: "Drugs_information", //? <Interaction_drug_name> or <Interaction_drug_name>
      required: true,
    },
    // change to userId
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authentication", // the user
      required: true,
    },
    doctorFeedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authentication", // the doctor or admin
      required: false,
    },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },
    suggestion: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

drugReviewSchema.pre(/^find/, function (next) {
  this.select("-__v");
  this.populate({ path: 'tradeName', model: 'Drugs_information',
    localField: 'tradeName',
    foreignField: 'tradeName', 
   }).populate({
    path: 'userId',
    model: 'Authentication',
    foreignField: 'userId',

  });
  next();
});

const DrugReview = mongoose.model("Drug_review", drugReviewSchema);

module.exports = DrugReview;
