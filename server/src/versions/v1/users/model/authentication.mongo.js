const mongoose = require('mongoose');

const authenticationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: String,
  refreshToken: String
});
authenticationSchema.pre(/^find/, function (next) {
  this.select('-__v -_id');
  next();
});
const AuthenticationsCollection = mongoose.model('Authentication', authenticationSchema);

module.exports = AuthenticationsCollection;