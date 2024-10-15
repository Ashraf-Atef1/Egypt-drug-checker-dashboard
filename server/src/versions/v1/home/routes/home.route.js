const express = require("express");
const homeRoute = express.Router();
const { getHomeController } = require("./home.controller");
const { authenticateToken } = require("../../../../middleware/auth.middleware");
homeRoute.get("/", authenticateToken(2), getHomeController);

module.exports = homeRoute;