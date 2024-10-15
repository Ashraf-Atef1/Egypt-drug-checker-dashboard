const express = require("express");
const {
  createItemController,
  getItemController,
  getAllItemsController,
  updateItemController,
  deleteItemController,
  buyItemController,
} = require("./store_items.controller");
const { authenticateToken } = require("../../../../middleware/auth.middleware");
const {
  storeItemInput,
  storeItemUpdateInput,
} = require("../model/store_items.validation");
const { validate } = require("../../../../middleware/validate.middleware");
const StoreItems = require("../model/store_items.mongo");
const { findQuery } = require("../../../../helpers/findQuery");

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const result = await findQuery(StoreItems, req.query);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/", getAllItemsController);

router.post(
  "/",
  authenticateToken(0),
  validate(storeItemInput),
  createItemController
);
router.post("/buy/:itemId", authenticateToken(2), buyItemController);

router.get("/:itemId", getItemController);

router.put(
  "/:itemId",
  authenticateToken(0),
  validate(storeItemUpdateInput),
  updateItemController
);

router.delete("/:itemId", authenticateToken(0), deleteItemController);

module.exports = router;
