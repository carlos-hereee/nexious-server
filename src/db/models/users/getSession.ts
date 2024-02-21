import { ObjectId } from "@app/db";
import Auth from "@db/schema/auth";

// search individual users
export const getSession = async ({ id, sessionId }: { id?: ObjectId; sessionId?: string }) => {
  // selection is required for hidden keys
  const selectOption = "+salt +password +sessionId +passwordHistory";
  if (sessionId) return await Auth.findOne({ sessionId }).select(selectOption);
  return await Auth.findOne({ _id: id }).select(selectOption);
};
