import type { UserRequest } from "@app/db";
import { generateHash } from "@authUtils/generateHash";
import { random } from "@authUtils/random";

export const updateSession = async (req: UserRequest) => {
  const salt = random();
  const sessionId = generateHash(salt, req.user.userId);
  req.user.auth.sessionId = sessionId;
  await req.user.save();
};
