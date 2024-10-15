const mongoose = require("mongoose");
const { string } = require("zod");

const authenticationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  acceptedReviews: {
    type: Number,
    default: 0,
  },
  rejectedReviews: {
    type: Number,
    default: 0,
  },
  userImage: {
    type: String,
    default: null,
  },
  currentFrame: {
    type: String,
    default: null,
  },
  userType: {
    type: String,
    default: "user",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalCoinsEarned: {
    type: Number,
    default: 10,
  },
  coins: {
    type: Number,
    default: 10,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoreItems",
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  imageUrl: String,
});
authenticationSchema.pre(/^find/, function (next) {
  this.select("-__v -_id");
  this.populate("items");
  next();
});
const AuthenticationsCollection = mongoose.model(
  "Authentication",
  authenticationSchema
);

module.exports = AuthenticationsCollection;
