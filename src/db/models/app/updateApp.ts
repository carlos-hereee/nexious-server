import type { AppFilters } from "types/app";
import App from "@db/schema/app";

export const updateApp = async ({ id, type, notificationId, storeId }: AppFilters) => {
  if (type === "add-notification") {
    if (id) return await App.updateOne({ _id: id }, { $addToSet: { notifications: notificationId } });
    if (storeId) {
      return await App.updateOne({ "store.storeId": storeId }, { $addToSet: { notifications: notificationId } });
    }
  }
};
