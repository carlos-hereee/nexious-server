import Users from "@dbSchema/users";

export = async ({ userId }, payload) => {
  return await Users.updateOne({ userId }, { $set: payload });
};
