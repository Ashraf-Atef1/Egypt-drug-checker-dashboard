const {
  createItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require("../model/store_items.model");
const { buyItem } = require("../../auth/model/authentication.model");
const AuthenticationsCollection = require("../../auth/model/authentication.mongo");
const jwt = require("jsonwebtoken");
const createToken = (payload, secret, expiresIn = "1d") => {
  return jwt.sign(payload, secret, { expiresIn });
};

const handleErrorResponse = (res, error, statusCode = 400) => {
  res.status(statusCode).json({ message: error.message });
};

const handleSuccessResponse = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json({ message, ...data });
};

const createItemController = async (req, res) => {
  try {
    const itemData = req.body;
    const item = await createItem(itemData);
    handleSuccessResponse(res, "Item created successfully", { item }, 201);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getItemController = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await getItem(itemId);
    handleSuccessResponse(res, "Item retrieved successfully", { item });
  } catch (error) {
    handleErrorResponse(res, error, 404);
  }
};

const updateItemController = async (req, res) => {
  try {
    const { itemId } = req.params;
    const itemData = req.body;
    const item = await updateItem(itemId, itemData);
    handleSuccessResponse(res, "Item updated successfully", { item });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.params;
    const response = await deleteItem(itemId);
    handleSuccessResponse(res, "Item deleted successfully", response);
  } catch (error) {
    handleErrorResponse(res, error, 404);
  }
};

const getAllItemsController = async (req, res) => {
  try {
    const items = await getAllItems();
    handleSuccessResponse(res, "Items retrieved successfully", { items });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const buyItemController = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await getItem(itemId);
    await buyItem(req.user.userId, itemId, item);
    // bad stratgy the set of cookies need to be in a model function not in the controller
    // we set the new cookie if the user upgraded to a doctor user
    const {userId} = req.user;
    const user = await AuthenticationsCollection.findOne({userId});
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
    handleSuccessResponse(res, "Item retrieved successfully", { item, user });
  } catch (error) {
    handleErrorResponse(res, error, 404);
  }
};

module.exports = {
  createItemController,
  getItemController,
  getAllItemsController,
  updateItemController,
  deleteItemController,
  buyItemController,
};
