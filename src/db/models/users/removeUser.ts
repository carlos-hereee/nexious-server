import Users from "@dbSchema/users";

export = async ({ userId }) => {
  return await Users.findOneAndDelete({ userId });
};
