import type { AppFilters } from "@app/app";
import App from "@db/schema/app";

export const updateApp = async ({ accountId, type, notification }: AppFilters) => {
  if (type === "add-notification") {
    // require key variable
    if (!accountId) throw Error("accountId param is required");
    if (!notification) throw Error("notification param is required");
    return App.updateOne({ "store.accountId": accountId }, { $push: { notifications: notification } });
  }
};
