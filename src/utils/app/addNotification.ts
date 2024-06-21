import { createNotification } from "@db/models/notification/createNotification";
import { formatNotification } from "./format/formatNotification";

type T = "add-merch" | "edit-user" | "order-paid" | "order-in-store";
// create notification
export const addNotification = async (type: T) => {
  const notification = formatNotification({ type });
  return await createNotification(notification);
};
