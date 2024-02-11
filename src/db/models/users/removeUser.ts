import type { UserFilters } from "@app/user";
import Users from "@dbSchema/users";

export const removeUser = async ({ userId }: UserFilters) => {
  return await Users.findOneAndDelete({ userId });
};
