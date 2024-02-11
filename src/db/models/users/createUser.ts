import type { InitUser } from "@app/user";
import Users from "@db/schema/users";

export const createUser = async (payload: InitUser) => {
  return await Users.create(payload);
};
