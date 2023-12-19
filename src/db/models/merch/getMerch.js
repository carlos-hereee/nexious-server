const Merch = require("../../schema/merch");

module.exports = async ({ appId, storeId, merchId, merchIds }) => {
  if (merchIds) return await Merch.find({ uid: merchIds });
  if (merchId && storeId) return await Merch.findOne({ uid: merchId, storeId });
  if (merchId) return await Merch.findOne({ uid: merchId });
  if (appId) return await Merch.findOne({ appId });
  if (storeId) return await Merch.findOne({ storeId });
};
