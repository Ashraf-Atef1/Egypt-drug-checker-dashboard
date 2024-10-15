const express = require("express");
const AuthenticationsCollection = require("../model/authentication.mongo");
const { findQuery } = require("../../../../helpers/findQuery");
const usersRoute = express.Router();

usersRoute.get("/", async (req, res) => {
  try {
    const result = await findQuery(AuthenticationsCollection, req.query, [
      "password",
      "isVerified",
    ]);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

usersRoute.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { data } = await findQuery(AuthenticationsCollection, { userId }, [
      "password",
      "isVerified",
    ]);
    const user = data[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = usersRoute;
