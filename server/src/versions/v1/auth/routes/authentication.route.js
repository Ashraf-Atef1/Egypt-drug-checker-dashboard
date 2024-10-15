const {
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
} = require("./authentication.controller");
const path = require('path')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage });

const {
  signupInput,
  loginInput,
  updateUserInput,
} = require("../model/authentication.validation");

const express = require("express");
const { authenticateToken } = require("../../../../middleware/auth.middleware");
const { validate } = require("../../../../middleware/validate.middleware");

const authenticationRoute = express.Router();

authenticationRoute.post("/signup", validate(signupInput), signupController);

authenticationRoute.post("/login", validate(loginInput), loginController);
authenticationRoute.get("/logout", authenticateToken(2), logedOutController
);
authenticationRoute.get("/", authenticateToken(2), getMeController);

authenticationRoute.put(
  "/",
  authenticateToken(2),
  validate(updateUserInput),
  updateMeController
);


authenticationRoute.get("/verify-email/:token", verifyEmailController);

authenticationRoute.post(
  "/resend-verification-email",
  resendVerificationEmailController
);

authenticationRoute.post("/forgot-password", forgotPasswordController);

authenticationRoute.post("/reset-password/:token", resetPasswordController);
authenticationRoute.put("/delete-image/me", authenticateToken(2), deleteMeImageController);
authenticationRoute.put("/delete-image/admin", authenticateToken(0), deleteImageController);
authenticationRoute.post("/change-image", upload.single('avatar'),authenticateToken(2), changeMeImageController)
authenticationRoute.post("/change-image/:userId", upload.single('avatar'),authenticateToken(0), changeImageController)
authenticationRoute.get("/user-image/:fileName", authenticateToken(2), getImageController);
authenticationRoute.put("/set-frame", authenticateToken(2), setCurrentFrameController);
authenticationRoute.put(
  "/:id",
  authenticateToken(0),
  validate(updateUserInput),
  updateMeController
);
module.exports = authenticationRoute;
