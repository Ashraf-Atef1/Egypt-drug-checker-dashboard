const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const AuthenticationsCollection = require('./authentication.mongo');

async function addUser (userData) {
  const {firstName, lastName, email, password} = userData;
  if (!firstName || !lastName || !email || !password) throw new Error('Missing required fields');
  const checkEmail = await AuthenticationsCollection.findOne({
    email: email
  });
  if (checkEmail) throw new Error('Email already exists');
  const userId = crypto.randomBytes(16).toString('hex');
  userData.userId = userId;
  userData.userType = 'user';
  const tokenData = {userId: userId, userType: userData.userType};
  const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET);
  const newUser = new AuthenticationsCollection(userData);
  const status = await newUser.save();
  if (!status) throw new Error('Failed to add this user');
  return {accessToken, refreshToken};
}

async function getUser (userData) {
  const {email, password} = userData;
  if (!email || !password) throw new Error('Missing required fields');
  const checkUser = await AuthenticationsCollection.findOne({
    email: email,
    password: password
  });
  if (!checkUser) throw new Error('User not found');
  const { firstName, lastName, userType  } = checkUser;
  const tokenData = {userId: checkUser.userId, userType: checkUser.userType};
  const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET);
  return {accessToken, refreshToken, firstName, lastName, userType, email };
}

module.exports = { addUser, getUser };