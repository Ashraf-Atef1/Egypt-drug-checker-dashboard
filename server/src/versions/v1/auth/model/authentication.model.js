const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AuthenticationsCollection = require("./authentication.mongo");

const iterations = 10000;
const keylen = 64;
const digest = "sha512";

/**
 * Hashes a password with a randomly generated salt.
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - The hashed password and salt concatenated as a single string.
 */
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keylen,
      digest,
      (err, derivedKey) => {
        if (err) reject(err);
        const hash = derivedKey.toString("hex");
        resolve(`${salt}:${hash}`);
      }
    );
  });
}

/**
 * Verifies if the password matches the hashed password.
 * @param {string} password - The plain text password to verify.
 * @param {string} hashedPassword - The stored hashed password (salt:hash format).
 * @returns {Promise<boolean>} - True if the password matches, false otherwise.
 */
async function verifyPassword(password, hashedPassword) {
  const [salt, originalHash] = hashedPassword.split(":");
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keylen,
      digest,
      (err, derivedKey) => {
        if (err) reject(err);
        const hash = derivedKey.toString("hex");
        resolve(hash === originalHash);
      }
    );
  });
}

/**
 * Adds a new user to the database.
 * @param {AuthenticationsCollection} userData - The user data containing email and password.
 * @returns {Promise<AuthenticationsCollection>} - The newly created user object.
 * @throws {Error} - Throws an error if the email already exists or if adding the user fails.
 */
async function addUser(userData) {
  const { email, password } = userData;
  const checkEmail = await AuthenticationsCollection.findOne({ email });
  if (checkEmail) throw new Error("Email already exists");
  userData.userType = "user";
  userData.password = await hashPassword(password);
  const newUser = new AuthenticationsCollection(userData);
  const status = await newUser.save();
  if (!status) throw new Error("Failed to add this user");
  return newUser;
}

/**
 * Retrieves a user by email and verifies the password.
 * @param {AuthenticationsCollection} userData - The user data containing email and password.
 * @returns {Promise<AuthenticationsCollection>} - The user object without the password.
 * @throws {Error} - Throws an error if the user is not found or if the password is invalid.
 */
async function getUser(userData) {
  const { email, password } = userData;
  const checkUser = await AuthenticationsCollection.findOne({ email }).lean();
  if (!checkUser) throw new Error("User not found");

  const isPasswordValid = await verifyPassword(password, checkUser.password);
  if (!isPasswordValid) throw new Error("Invalid password");
  const { password: _, ...userWithoutPassword } = checkUser;
  return userWithoutPassword;
}

/**
 * Retrieves the authenticated user's information.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<AuthenticationsCollection>} - The user object without the password.
 * @throws {Error} - Throws an error if the user is not found.
 */
async function getMe(userId) {
  const checkUser = await AuthenticationsCollection.findOne({ userId }).lean();
  if (!checkUser) throw new Error("User not found");
  const { password, ...userWithoutPassword } = checkUser;
  return userWithoutPassword;
}

/**
 * Verifies the user's email using a token.
 * @param {string} token - The verification token.
 * @returns {Promise<{ message: string }>} - A message indicating successful verification.
 * @throws {Error} - Throws an error if the user is not found or already verified.
 */
async function verifyUser(token) {
  const decoded = jwt.verify(token, process.env.VERIFY_TOKEN_SECRET);
  const checkUser = await AuthenticationsCollection.findOne({
    userId: decoded.userId,
  });
  if (!checkUser) throw new Error("User not found");
  if (checkUser.isVerified) throw new Error("User already verified");
  checkUser.isVerified = true;
  const status = await checkUser.save();
  if (!status) throw new Error("Failed to verify this user");
  return { message: "User verified successfully" };
}

/**
 * Adds coins to a user's account.
 * @param {string} userId - The ID of the user.
 * @param {number} coins - The number of coins to add.
 * @returns {Promise<{ message: string, coins: number }>} - A message indicating successful coin update and the new coin balance.
 * @throws {Error} - Throws an error if the user is not found.
 */
async function addCoins(userId, coins, state=null) {
  const updateData = { coins: coins, totalCoinsEarned: coins };
  if (state === "pending") {
    updateData.totalReviews= 1;

  }else if (state === "approved"){
    updateData.acceptedReviews= 1;
  }else if (state === "rejected"){
    updateData.rejectedReviews= 1;
  }else if (state === "direct-accept") {
    updateData.totalReviews= 1;
    updateData.acceptedReviews= 1;
  }

  const updatedUser = await AuthenticationsCollection.findOneAndUpdate(
    { userId },
    { $inc: updateData },
    { new: true }
  );
  
  if (!updatedUser) throw new Error("User not found");
  return { message: "Coins updated successfully", coins: updatedUser.coins };
}

/**
 * Removes coins from a user's account.
 * @param {string} userId - The ID of the user.
 * @param {number} coins - The number of coins to remove.
 * @returns {Promise<{ message: string, coins: number }>} - A message indicating successful coin update and the new coin balance.
 */
async function removeCoins(userId, coins) {
  const updatedUser = await AuthenticationsCollection.findOneAndUpdate(
    { userId, coins: { $gte: coins } },
    { $inc: { coins: -coins } },
    { new: true }
  );
  if (!updatedUser) throw new Error("insufficient coins");
  return { message: "Coins updated successfully", coins: updatedUser.coins };
}

/**
 * Updates user information in the database.
 * @param {string} userId - The ID of the user.
 * @param {AuthenticationsCollection} userData - The user data containing fields to update.
 * @returns {Promise<AuthenticationsCollection>} - The updated user object without the password.
 * @throws {Error} - Throws an error if the user is not found or if the update fails.
 */
async function updateUser(userId, userData) {
  const checkUser = await AuthenticationsCollection.findOne({ userId });
  if (!checkUser) throw new Error("User not found");

  if (userData.password) {
    userData.password = await hashPassword(userData.password);
  }

  const updatedUser = await AuthenticationsCollection.findOneAndUpdate(
    { userId },
    { $set: userData },
    { new: true }
  ).lean();

  if (!updatedUser) throw new Error("Failed to update user");
  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
}

/**
 * Buys an item for a user by checking if the item exists, removing coins, and adding the item to their account.
 * @param {string} userId - The ID of the user.
 * @param {string} itemId - The ID of the item to buy.
 * @param {number} itemCost - The cost of the item in coins.
 * @returns {Promise<{ message: string, items: Array, coins: number }>} - A message indicating successful purchase and the updated items and coin balance.
 * @throws {Error} - Throws an error if the user is not found, if they have insufficient coins, or if the item already exists.
 */
async function buyItem(userId, itemId, item) {
  const itemCost = item.price;
  const user = await AuthenticationsCollection.findOne({ userId });
  const newUserType = {}
  if (!user) throw new Error("User not found");

  if (user.items.includes(itemId)) {
    throw new Error("Item already exists in the user's items");
  }
  if(item.type === "doctor user" && !["admin", "doctor"].includes(user.userType)){
    newUserType.userType = "doctor";
  }
  const result = await AuthenticationsCollection.findOneAndUpdate(
    { userId },
    { $addToSet: { items: itemId }, ...newUserType },
    { new: true }
  );

  await removeCoins(userId, itemCost);
  return {
    message: "Item purchased successfully",
    items: result.items,
    coins: (await AuthenticationsCollection.findOne({ userId })).coins,
  };
}

module.exports = {
  addUser,
  getUser,
  addCoins,
  buyItem,
  getMe,
  verifyUser,
  hashPassword,
  verifyPassword,
  updateUser,
};
