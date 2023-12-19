const Merch = require("../../schema/merch");

module.exports = async ({ storeId }, payload) => {
  return await Merch.updateOne({ storeId }, { $set: payload });
};
