import { AuthSchema } from "@app/auth";
import type { ObjectId } from "@app/db";
import Auth from "@db/schema/auth";
import Users from "@db/schema/users";

interface UpdateAll {
  type: "add-subscription" | "remove-subscription";
  subscriptionId: ObjectId;
}
interface UpdateUser {
  userId: ObjectId;
  notificationId?: string;
  type: "remove-notification";
}
// search individual users
export const updateAllUsers = async ({ type, subscriptionId }: UpdateAll) => {
  if (type === "add-subscription") {
    return await Users.updateMany({}, { $addToSet: { accountTiers: subscriptionId } }, { multi: true });
  }
  if (type === "remove-subscription") {
    return await Users.updateMany({}, { $pull: { accountTiers: subscriptionId } }, { multi: true });
  }
};
export const updateUserNotification = async ({ userId, notificationId, type }: UpdateUser) => {
  if (type === "remove-notification") {
    // require key variable
    if (!notificationId) throw Error("notificationId param is required");
    return await Users.updateOne(
      { _id: userId },
      { $pull: { notifications: notificationId }, $addToSet: { archivedNotifications: notificationId } }
    );
  }
};
export const updateAuthSession = async ({ id, auth }: { id: ObjectId; auth: AuthSchema }) => {
  return await Auth.updateOne({ _id: id }, { $set: auth });
};
