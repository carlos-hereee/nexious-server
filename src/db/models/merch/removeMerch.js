const Merch = require("../../schema/merch");

module.exports = async ({ storeId, appId, deleteMany }) => {
  if (deleteMany) return await Merch.deleteMany({ storeId });
  return await Merch.findOneAndDelete({ storeId, appId });
};
