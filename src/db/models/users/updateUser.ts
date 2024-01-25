import Users from "@dbSchema/users.js";

export const updateUser = async ({ userId }, payload) => {
  return await Users.updateOne({ userId }, { $set: payload });
};
