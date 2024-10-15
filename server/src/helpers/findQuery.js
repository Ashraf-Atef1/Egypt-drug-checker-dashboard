const mongoose = require("mongoose");

/**
 * Query options for the pagination and filtering function.
 * @typedef {Object} QueryOptions
 * @property {Object} searchFields - An object where keys are fields to search and values are their expected values.
 * @property {number} [page=1] - The page number for pagination (default is 1).
 * @property {number} [limit=10] - The number of items per page (default is 10).
 * @property {string} [sortBy] - The field to sort results by (default is "createdAt").
 * @property {string} [order='desc'] - The sort order: 'asc' for ascending or 'desc' for descending (default is 'desc').
 */

/**
 * Generates a paginated, searchable, and filterable function for any Mongoose model.
 *
 * @param {mongoose.Model} model - The Mongoose model to query.
 * @param {QueryOptions} queryParams - Options to configure search, pagination, and sorting.
 * @param {String[]} exclude - Options to exclude from the results
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *   - data: An array of results matching the search criteria.
 *   - pagination: An object containing:
 *     - totalItems: The total number of items that match the search criteria.
 *     - totalPages: The total number of pages based on the limit.
 *     - currentPage: The current page number.
 */
const findQuery = async (model, queryParams = {}, exclude = []) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    order = "desc",
    ...searchFields
  } = queryParams;

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const sortField = sortBy || "createdAt";
  const sortOrder = order === "desc" ? -1 : 1;

  const searchFilter = {};

  exclude.forEach((field) => {
    delete searchFields[field];
  });

  for (const [key, value] of Object.entries(searchFields)) {
    if (value === undefined) continue;

    const handleValue = (val) => {
      const lowerVal = val.toLowerCase();

      if (lowerVal === "true") return true;
      if (lowerVal === "false") return false;
      if (key.toLowerCase().includes("id")) return val;

      return { $regex: "^"+val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" };
    };

    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      searchFilter[key] = numericValue;
    } else if (typeof value === "string") {
      searchFilter[key] = handleValue(value);
    } else {
      searchFilter[key] = value;
    }
  }

  const selectFields = exclude.map((field) => `-${field}`).join(" ");

  const data = await model
    .find(searchFilter)
    .select(selectFields)
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(limitNum);

  const totalItems = await model.countDocuments(searchFilter);

  return {
    data,
    pagination: {
      totalItems,
      totalPages: Math.ceil(totalItems / limitNum),
      currentPage: pageNum,
    },
  };
};

module.exports = { findQuery };
