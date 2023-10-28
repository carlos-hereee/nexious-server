const App = require("../../schema/app");

module.exports = async ({ appId, appName, appIds, ownerId, all }) => {
  const includeData = "landing.cta landing.sections menu.active menu.alternatives logo";
  if (all) {
    return await App.find().select("appName appId logo adminIds");
  }
  if (appIds) {
    return await App.find(appIds).populate(includeData).exec();
  }
  if (ownerId) {
    return await App.find({ ownerId }).populate(includeData).exec();
  }
  if (appId) {
    return await App.findOne({ appId }).populate(includeData);
  }
  if (appName) {
    return await App.findOne({ appName }).populate(includeData);
  }
};
