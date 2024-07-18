import { ObjectId } from "@app/db";
import Notification from "@db/schema/notification";

interface GetNotification {
  id?: ObjectId;
  notificationId?: string;
}
export const getNotification = async ({ id, notificationId }: GetNotification) => {
  if (id) return await Notification.findOne({ _id: id });
  if (notificationId) return await Notification.findOne({ notificationId });
};
