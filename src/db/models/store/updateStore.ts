const Store = require("../../schema/store");

export = async ({ storeId }, payload) => {
  return await Store.updateOne({ storeId }, { $set: payload });
};
