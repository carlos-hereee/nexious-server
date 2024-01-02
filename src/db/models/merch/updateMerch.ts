const Merch = require("../../schema/merch");

export = async ({ storeId }, payload) => {
  return await Merch.updateOne({ storeId }, { $set: payload });
};
