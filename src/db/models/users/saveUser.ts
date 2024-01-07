import Users from "@dbSchema/users";

export const saveUser = async (payload) => {
  return await Users.create(payload);
};
