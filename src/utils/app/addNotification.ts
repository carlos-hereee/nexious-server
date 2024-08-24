import type { FormatNotification } from "@app/app";
import Notifications from "@db/schema/notification";

// create notification
export const addNotification = async ({ type, message, link, name, user }: FormatNotification) => {
  console.log("user :>> ", user);
  // require key variable
  if (!user) throw Error("user param is required");
  return await Notifications.create({ category: type || "user", message, link, name });
};
