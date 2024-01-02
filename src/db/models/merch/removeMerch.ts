const Merch = require("../../schema/merch");

export = async ({ storeId, appId, deleteMany, merchId }) => {
  if (merchId) return await Merch.findOneAndDelete({ merchId });
  if (deleteMany) return await Merch.deleteMany({ storeId });
  return await Merch.findOneAndDelete({ storeId, appId });
};
