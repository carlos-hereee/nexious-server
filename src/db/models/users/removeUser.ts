import type { GetUserProps } from "@app/user";
import Users from "@dbSchema/users.js";

export const removeUser = async ({ userId }: GetUserProps) => {
  return await Users.findOneAndDelete({ userId });
};
