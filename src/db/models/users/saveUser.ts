import Users from "@dbSchema/users";

export = async (payload) => {
  return await Users.create(payload);
};
