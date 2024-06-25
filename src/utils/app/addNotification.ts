import { createNotification } from "@db/models/notification/createNotification";
import { formatNotification } from "./format/formatNotification";
import { FormatNotification } from "@app/app";

// create notification
export const addNotification = async ({ type, message }: FormatNotification) => {
  const notification = formatNotification({ type, message });
  return await createNotification(notification);
};
