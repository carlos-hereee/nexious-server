const Store = require("../../schema/store");

module.exports = async ({ appId, pageId }) => {
  if (appId) {
    return await Store.find({ appId });
  }
  if (pageId) {
    return await Store.findOne({ pageId });
  }
};
