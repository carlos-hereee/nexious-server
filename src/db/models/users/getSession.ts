import { ObjectId } from "@app/db";
import Auth from "@db/schema/auth";

// search individual users
export const getSession = async (sessionId: ObjectId) => {
  return await Auth.findOne({ _id: sessionId });
};
