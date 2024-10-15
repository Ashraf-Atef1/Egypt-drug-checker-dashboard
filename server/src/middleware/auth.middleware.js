const jwt = require("jsonwebtoken");
const AuthenticationsCollection = require("../versions/v1/auth/model/authentication.mongo");
const cookieParser = require("cookie-parser");

/**
 * Middleware to authenticate the JWT from cookies.
 * @param {number} accessNumber
 * @admin 0
 * @doctor 1
 * @user 2
 */
function authenticateToken(accessNumber) {
  const userTypes = {
    0: ["admin"],
    1: ["admin", "doctor"],
    2: ["admin", "doctor", "user"],
  };

  return (req, res, next) => {
    const token = req.cookies?.token;
    console.log("token\n", req.cookies.token);
    if (!token)
      return res.status(401).send({ error: "Authentication token missing" });

    // Verify the token using the secret
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(403).send({ error: err });
      // Check if the user's type is allowed
      if (!userTypes[accessNumber].includes(user.userType)) {
        return res.status(403).send({ error: "Forbidden: Access denied" });
      }

      // Optional: Check if the user exists in the database (disabled by default)
      /*
      const checkUser = await AuthenticationsCollection.findById(user.id);
      if (!checkUser) {
        return res.status(403).send({ error: "User not found" });
      }

      if (!checkUser.isVerified) {
        return res.status(403).send({ error: "User not verified" });
      }
      */

      // Attach the decoded user to the request object so it's available in the next middleware
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    });
  };
}

module.exports = { authenticateToken };
