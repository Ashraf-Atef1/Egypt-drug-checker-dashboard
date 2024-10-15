const mongoose = require("mongoose");

const storeItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  // imageUrl: {
  //   type: String,
  //   required: true,
  // },
  type: {
    type: String,
    enum: ["frame", "badge", "doctor user"],
    required: true,
  },
});

storeItemSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const StoreItems = mongoose.model("StoreItems", storeItemSchema);

module.exports = StoreItems;
