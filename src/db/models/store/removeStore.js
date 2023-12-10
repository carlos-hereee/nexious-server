const Store = require("../../schema/store");

module.exports = async ({ storeId, appId }) => {
  return await Store.findOneAndDelete({ storeId, appId });
};
