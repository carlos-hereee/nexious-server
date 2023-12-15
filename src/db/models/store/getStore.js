const Store = require("../../schema/store");

module.exports = async ({ appId, userId }) => {
  if (appId && userId) {
    return await Store.findOne({ userId, appId });
  }
};
