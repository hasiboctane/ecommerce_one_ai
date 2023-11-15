const mongoose = require("mongoose");
const createError = require("http-errors");

const findItemById = async (ItemModel, id, options = {}) => {
    try {
        const item = await ItemModel.findById(id, options);
        if (!item) {
            throw createError(404, `Item with id: ${id} does not exist`)
        }
        return item
    } catch (error) {
        if (error instanceof mongoose.Error) {
            throw createError(400, `Invalid Item  Id`);
        }
        throw error
    }
}
module.exports = { findItemById }