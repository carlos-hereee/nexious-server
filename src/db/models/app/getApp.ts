import type { GetAppProps } from "@app/app.js";
import App from "@dbSchema/app.js";

export const getApp = async ({ appId, appName, locale }: GetAppProps) => {
  const includeData = "owner pages store calendar";

  if (locale && appName) {
    return await App.findOne({ appName, locale }).populate(includeData);
  }

  if (appId) {
    return await App.findOne({ appId });
  }
  if (appName) {
    return await App.findOne({ appName }).populate(includeData);
  }
};
export const getAllApps = async ({ appIds, all, ownerId }: GetAppProps) => {
  const includeData = "owner pages store calendar";
  if (all) {
    return await App.find().select("appName appId logo menu owner media").populate({
      path: "owner",
      select: "userId",
    });
  }
  if (appIds) {
    return await App.find(appIds).populate(includeData);
  }
  if (ownerId) {
    return await App.find({ ownerId }).populate(includeData);
  }
};
