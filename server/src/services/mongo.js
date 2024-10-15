const mongoose = require("mongoose");

async function mongooseConnect() {
  const mongoURI = process.env.MONGODB_URL;
  await mongoose.connect(mongoURI);
}
module.exports = mongooseConnect;
