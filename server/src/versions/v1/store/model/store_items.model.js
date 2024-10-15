const StoreItems = require("./store_items.mongo");

/**
 * Creates a new item in the database.
 * @param {Object} itemData - The data for the new item (name, price, etc.).
 * @throws {Error} - Throws an error if adding the item fails.
 */
async function createItem(itemData) {
  const newItem = new StoreItems(itemData);
  const savedItem = await newItem.save();
  if (!savedItem) throw new Error("Failed to create item");
  return savedItem.toObject();
}

/**
 * Retrieves an item by ID.
 * @param {string} itemId - The ID of the item.
 * @throws {Error} - Throws an error if the item is not found.
 */
async function getItem(itemId) {
  const item = await StoreItems.findById(itemId).lean();
  if (!item) throw new Error("Item not found");
  return item;
}

/**
 * Updates item information in the database.
 * @param {string} itemId - The ID of the item.
 * @param {Object} itemData - The item data containing fields to update.
 * @throws {Error} - Throws an error if the item is not found or if the update fails.
 */
async function updateItem(itemId, itemData) {
  const updatedItem = await StoreItems.findByIdAndUpdate(
    itemId,
    { $set: itemData },
    { new: true }
  ).lean();
  if (!updatedItem) throw new Error("Failed to update item");
  return updatedItem;
}

/**
 * Deletes an item from the database.
 * @param {string} itemId - The ID of the item.
 * @throws {Error} - Throws an error if the item is not found.
 */
async function deleteItem(itemId) {
  const deletedItem = await StoreItems.findByIdAndDelete(itemId).lean();
  if (!deletedItem) throw new Error("Item not found");
  return { message: "Item deleted successfully" };
}
/**
 * Retrieves all items from the database.
 */
async function getAllItems() {
  return await StoreItems.find().lean();
}
module.exports = {
  createItem,
  getAllItems,
  getItem,
  updateItem,
  deleteItem,
};
