const {addUser, getUser} = require('../model/authentication.model');

async function addUserController (req, res) {
  try {
    const {accessToken, refreshToken} = await addUser(req.body);
    res.status(201).send({accessToken, refreshToken});
  } catch (error) {
    res.status(400).send({error: error.message});
  }
}

async function getUserController (req, res) {
    try {
        const {accessToken, refreshToken, firstName, lastName, userType, email} = await getUser(req.body);
        res.status(200).send({accessToken, refreshToken, firstName, lastName, userType, email});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

module.exports = {addUserController, getUserController};