const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
  tradeName: {
    type: String,
    unique: true,
    required: true,
  },
  genericName: String,
  price: {
    type: Number,
    min: 0,
  },
  pharmacology: String,
  company: String,
  moreInformation: String,
  route: {
    type: String,
  },
  isReviewed: {
    type: Boolean,
    default: false,
  },
  interactionName: String,
});
drugSchema.pre(/^find/, function (next) {
  this.select("-__v -_id");
  next();
});

drugSchema.index({ tradeName: 1 });

const DrugsInforamtionsCollection = mongoose.model(
  "Drugs_information",
  drugSchema
);
module.exports = DrugsInforamtionsCollection;
