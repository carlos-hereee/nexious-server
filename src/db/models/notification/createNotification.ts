import { NotificationSchema } from "@app/db";
import Notfication from "@db/schema/notification";

export const createNotification = async (payload: NotificationSchema) => {
  return await Notfication.create(payload);
};
