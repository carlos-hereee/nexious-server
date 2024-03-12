import type { IUserSchema, UserFilters } from "@app/user";
import Users from "@db/schema/users";
import Auth from "@db/schema/auth";

// search individual users
export const getUser = async ({ username, email, userId }: UserFilters): Promise<IUserSchema | null> => {
  if (username) return await Users.findOne({ username });
  if (email) return await Users.findOne({ email });
  if (userId) {
    // send data required by client
    return await Users.findOne({ userId }).populate({
      path: "ownedApps subscriptions",
      select: "appName appId ownerId menu media logo",
    });
  }
  return null;
};
// search a list of users
export const getAllUsers = async ({ all, appId }: UserFilters) => {
  // find users in a given app
  if (appId) return await Users.find({ appId });
  // list all users
  if (all) return await Users.find();
};

// search individual users
export const getSession = async ({ id, sessionId }: UserFilters) => {
  // selection is required for hidden keys
  const selectOption = "+salt +password +sessionId +passwordHistory";
  if (sessionId) return await Auth.findOne({ sessionId }).select(selectOption);
  return await Auth.findOne({ _id: id }).select(selectOption);
};
