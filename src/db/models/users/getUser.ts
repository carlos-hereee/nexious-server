import type { GetUserProps } from "@app/user";
import Users from "@dbSchema/users.js";

export const getUser = async ({ username, email, userId }: GetUserProps) => {
  if (username) {
    return await Users.findOne({ username });
  }
  if (userId) {
    // send data required by client
    return await Users.findOne({ userId }).populate({
      path: "ownedApps subscriptions",
      select: "appName appId ownerId menu media owner logo",
      populate: { path: "owner", select: "userId url small alt heroId uid" },
    });
  }
  if (email) {
    return await Users.findOne({ email });
  }

  // return null;
};
export const getAllUsers = async ({ all, appId }: GetUserProps) => {
  if (appId) {
    return await Users.find({ appId });
  }
  if (all) {
    return await Users.find();
  }
};
