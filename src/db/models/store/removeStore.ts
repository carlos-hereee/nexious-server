const Merch = require("../../schema/merch");
const Store = require("../../schema/store");

// module.exports = async ({ storeId, appId }) => {
module.exports = async ({ storeId }) => {
  // if (appId) return await Store.findOneAndDelete({ appId });
  const store = await Store.findOneAndDelete({ storeId });
  if (store) {
    const merch = await Merch.deleteMany({ storeId });
    console.log("merch :>> ", merch);
    return { store, merch };
  }
  return { store };
};
