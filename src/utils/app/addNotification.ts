import { createNotification } from "@db/models/notification/createNotification";
import { formatNotification } from "./format/formatNotification";

type T = "add-merch" | "edit-user" | "order-paid" | "order-in-store" | "edit-merch";
// create notification
export const addNotification = async (type: T, message?: string) => {
  const notification = formatNotification({ type, message });
  return await createNotification(notification);
};
