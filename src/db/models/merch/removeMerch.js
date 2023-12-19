const Merch = require("../../schema/merch");

module.exports = async ({ storeId, appId }) => {
  return await Merch.findOneAndDelete({ storeId, appId });
};
