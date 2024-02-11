import type { UserFilters } from "@app/user";
import Users from "@db/schema/users";

// search individual users
export const getUser = async ({ username, email, userId }: UserFilters) => {
  // by username
  if (username) return await Users.findOne({ username });
  // by userId
  if (userId) {
    // send data required by client
    return await Users.findOne({ userId }).populate({
      path: "ownedApps subscriptions",
      select: "appName appId ownerId menu media owner logo",
      populate: { path: "owner", select: "userId url small alt heroId uid" },
    });
  }
  // by email
  if (email) return await Users.findOne({ email });
};
// search a list of users
export const getAllUsers = async ({ all, appId }: UserFilters) => {
  // find users in a given app
  if (appId) {
    return await Users.find({ appId });
  }
  // list all users
  if (all) {
    return await Users.find();
  }
};
// search for auth information using username
export const getUserAuthWithUsername = async ({ username }: UserFilters) => {
  // require key variable
  if (!username) throw Error("username is required");
  // selection is required for hidden keys
  const selectOption = "+auth.salt +auth.password +auth.sessionId +auth.passwordHistory";
  return await Users.findOne({ username }).select(selectOption).populate({
    path: "ownedApps",
    select: "appId appName owner adminIds logo themeList",
  });
};
// search for auth information using session id
export const getUserAuthWithSession = async ({ sessionId }: UserFilters) => {
  // require key variable
  if (!sessionId) throw Error("sessionId is required");
  // selection is required for hidden keys
  const selectOption = "+auth.salt +auth.password +auth.sessionId +auth.passwordHistory";
  return await Users.findOne({ "auth.sessionId": sessionId }).select(selectOption).populate({
    path: "ownedApps",
    select: "appId appName owner adminIds logo themeList",
  });
};
