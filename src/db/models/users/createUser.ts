import type { InitUser } from "@app/user";
import Users from "@dbSchema/users.js";

export const createUser = async (payload: InitUser) => {
  return await Users.create(payload);
};
