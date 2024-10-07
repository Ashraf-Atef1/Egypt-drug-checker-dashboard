const {addUserController, getUserController} = require("./authentication.controller");
const express = require('express');
const authenticationRoute = express.Router();

authenticationRoute.post('/signUp', addUserController);
authenticationRoute.post('/login', getUserController);

module.exports = authenticationRoute;
