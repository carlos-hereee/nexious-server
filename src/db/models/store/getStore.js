const Store = require("../../schema/store");

module.exports = async ({ appId, storeId }) => {
  if (appId) return await Store.findOne({ appId });
  if (storeId) return await Store.findOne({ storeId }).populate("inventory");
  return null;
};
