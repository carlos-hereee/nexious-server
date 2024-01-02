const Store = require("../../schema/store");

module.exports = async ({ storeId }, payload) => {
  return await Store.updateOne({ storeId }, { $set: payload });
};
