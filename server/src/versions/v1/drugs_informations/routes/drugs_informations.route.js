const {
  getDrugsInformation,
  addDrugsInformation,
  deleteDrugsInformation,
} = require("./drugs_informations.controller");

const DrugsInforamtionsCollection = require("../model/drugs_informations.mongo");

const { DrugInput } = require("../model/drugs_informations.validation");
const { authenticateToken } = require("../../../../middleware/auth.middleware");
const { validate } = require("../../../../middleware/validate.middleware");
const { findQuery } = require("../../../../helpers/findQuery");

const express = require("express");
const drugsInformationRoute = express.Router();

drugsInformationRoute.get("/", getDrugsInformation);

drugsInformationRoute.get("/search", async (req, res) => {
  try {
    const result = await findQuery(DrugsInforamtionsCollection, req.query);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

drugsInformationRoute.post(
  "/",
  validate(DrugInput),
  authenticateToken(2),
  addDrugsInformation
);

drugsInformationRoute.delete(
  "/:tradeName",
  authenticateToken(1),
  deleteDrugsInformation
);

module.exports = drugsInformationRoute;
