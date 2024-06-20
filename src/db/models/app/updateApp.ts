import type { AppFilters } from "@app/app";
import App from "@db/schema/app";

export const updateApp = async ({ id, type, notificationId }: AppFilters) => {
  if (type === "add-notification") {
    // require key variable
    if (!id) throw Error("id param is required");
    if (!notificationId) throw Error("notificationId param is required");
    return await App.updateOne(id, { $addToSet: { notifications: notificationId } });
  }
};
