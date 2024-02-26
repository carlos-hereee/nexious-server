import type { AppFilters } from "@app/app";
import App from "@db/schema/app";

export const getApp = async ({ appId, appName, locale }: AppFilters) => {
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
export const getAllApps = async ({ appIds, all, ownerId }: AppFilters) => {
  const includeData = "owner pages store calendar";
  if (all) {
    // avoid overloading requests set limit
    const selectData = "appName appUrl logo adminIds media appId";
    return await App.find().select(selectData).limit(30);
  }
  if (appIds) {
    return await App.find(appIds).populate(includeData);
  }
  if (ownerId) {
    return await App.find({ ownerId }).populate(includeData);
  }
};
