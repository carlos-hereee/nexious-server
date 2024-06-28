import type { ObjectId } from "@app/db";
import Users from "@db/schema/users";

interface UpdateAll {
  type: "add-subscription";
  subscriptionId: ObjectId;
}
// search individual users
export const updateAllUsers = async ({ type, subscriptionId }: UpdateAll) => {
  if (type === "add-subscription") {
    return await Users.updateMany({}, { $addToSet: { accountTiers: subscriptionId } }, { multi: true });
  }
};
