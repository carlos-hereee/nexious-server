import { ObjectId } from "@app/db";
import App from "@db/schema/app";
import Users from "@db/schema/users";

interface SendNotification {
  type: "user" | "app";
  id: ObjectId;
  notificationId: ObjectId;
}
export const sendNotification = async ({ id, notificationId, type }: SendNotification) => {
  if (type === "user") return await Users.updateOne(id, { $addToSet: { notifications: notificationId } });
  if (type === "app") return await App.updateOne(id, { $addToSet: { notifications: notificationId } });
};
