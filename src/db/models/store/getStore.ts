const Store = require("../../schema/store");

export = async ({ appId, storeId }) => {
  if (appId) return await Store.findOne({ appId });
  if (storeId) return await Store.findOne({ storeId }).populate("inventory");
  return null;
};
