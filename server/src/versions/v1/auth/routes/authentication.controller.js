const {
  addUser,
  getUser,
  getMe,
  updateUser,
  verifyUser,
  hashPassword,
} = require("../model/authentication.model");
const jwt = require("jsonwebtoken");
const AuthenticationsCollection = require("../model/authentication.mongo");
const emailClient = require("../../../../services/email");
const path = require("path");
const createToken = (payload, secret, expiresIn = "1d") => {
  return jwt.sign(payload, secret, { expiresIn });
};

const handleErrorResponse = (res, error, statusCode = 400) => {
  res.status(statusCode).json({ message: error.message });
};

const handleSuccessResponse = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json({ message, ...data });
};

async function signupController(req, res) {
  try {
    const user = await addUser(req.body);
    const token = createToken(
      { userId: user.userId, userType: user.userType },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: true
    });
    handleSuccessResponse(res, "User signed up successfully", { user }, 201);
  } catch (error) {
    handleErrorResponse(res, error);
  }
}

async function loginController(req, res) {
  try {
    const user = await getUser(req.body);
    const token = createToken(
      { userId: user.userId, userType: user.userType },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: true
    });
    handleSuccessResponse(res, "User logged in successfully", { user });
  } catch (error) {
    handleErrorResponse(res, error);
  }
}
const logedOutController = async (req, res) => {
  try {
    res.clearCookie("token");
    handleSuccessResponse(res, "User logged out successfully");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
const getMeController = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await getMe(userId);
    handleSuccessResponse(res, "User data retrieved successfully", { user });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const updateMeController = async (req, res) => {
  try {
    const userId = req.params.id || req.user.userId;
    const updatedUser = await updateUser(userId, req.body);
    handleSuccessResponse(res, "User updated successfully", {
      user: updatedUser,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const verifyEmailController = async (req, res) => {
  try {
    await verifyUser(req.params.token);
    handleSuccessResponse(res, "User verified successfully");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const resendVerificationEmailController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await AuthenticationsCollection.findOne({ email });
    if (!user) throw new Error("User not found");
    if (user.isVerified) throw new Error("User already verified");
    const token = createToken(
      { userId: user.userId },
      process.env.VERIFY_TOKEN_SECRET
    );
    await emailClient.sendVerificationEmail(user.email, token);
    handleSuccessResponse(res, "Verification email sent successfully");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await AuthenticationsCollection.findOne({ email });
    if (!user) throw new Error("User not found");
    const token = createToken(
      { userId: user.userId },
      process.env.RESET_PASSWORD_TOKEN_SECRET
    );
    await emailClient.sendResetPassword(user.email, token);
    handleSuccessResponse(res, "Reset password email sent successfully");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);
    const user = await AuthenticationsCollection.findById(decoded.userId);
    if (!user) throw new Error("User not found");
    user.password = await hashPassword(password);
    await user.save();
    handleSuccessResponse(res, "Password reset successfully");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const changeMeImageController = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await updateUser(userId, { userImage: req.file.filename });
    handleSuccessResponse(res, "Image uploaded successfully", { user });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
const changeImageController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await updateUser(userId, { userImage: req.file.filename });
    handleSuccessResponse(res, "Image uploaded successfully", { user });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
const deleteMeImageController = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await updateUser(userId, { userImage: "" });
    handleSuccessResponse(res, "Image deleted successfully", { user });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
const deleteImageController = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await updateUser(userId, { userImage: "" });
    handleSuccessResponse(res, "Image deleted successfully", { user });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getImageController = async (req, res) => {
  try {
    const fileName = req.params.fileName
    const imagePath = path.join(__dirname, "..", "..", "..", "..", "..", 'uploads', fileName);
    res.sendFile(imagePath);
  } catch (error) {

    handleErrorResponse(res, error);
  }
};
const setCurrentFrameController = async (req, res) => {
  try {
    const { frameName } = req.body;
    const {userId} = req.user;
    const newUserData = await AuthenticationsCollection.findOneAndUpdate(
      { userId },
      { currentFrame: frameName },
      { new: true }
    )
    res.json({ message: "Frame set successfully", user: newUserData});
  } catch (error) {

    handleErrorResponse(res, error);
  }
};
module.exports = {
  signupController,
  loginController,
  logedOutController,
  getMeController,
  updateMeController,
  verifyEmailController,
  resendVerificationEmailController,
  forgotPasswordController,
  resetPasswordController,
  changeImageController,
  getImageController,
  setCurrentFrameController,
  changeMeImageController,
  deleteImageController,
  deleteMeImageController,
};
