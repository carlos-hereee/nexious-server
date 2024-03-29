import type { UserFilters } from "@app/user";
import Users from "@db/schema/users";

export const removeUser = async ({ userId }: UserFilters) => {
  return await Users.findOneAndDelete({ userId });
};
