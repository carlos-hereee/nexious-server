import App from "@dbSchema/app";

export = async ({ appId, appName, appIds, ownerId, all, locale }) => {
  const includeData = "owner pages store calendar";

  if (all) {
    return await App.find().select("appName appId logo menu owner media").populate({
      path: "owner",
      select: "userId",
    });
  }
  if (locale && appName) {
    return await App.findOne({ appName, locale }).populate(includeData);
  }
  if (appIds) {
    return await App.find(appIds).populate(includeData);
  }
  if (ownerId) {
    return await App.find({ ownerId }).populate(includeData);
  }
  if (appId) {
    return await App.findOne({ appId });
    // return await App.findOne({ appId }).populate(includeData);
  }
  if (appName) {
    return await App.findOne({ appName }).populate(includeData);
  }
};
