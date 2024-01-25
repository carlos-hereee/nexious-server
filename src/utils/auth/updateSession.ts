import type { AuthRequest } from "@app/auth.js";
import { generateHash } from "@authUtils/generateHash.js";
import { random } from "@authUtils/random.js";

export const updateSession = async (req: AuthRequest) => {
  const salt = random();
  const sessionId = generateHash(salt, req.user.userId);
  req.user.auth.sessionId = sessionId;
  await req.user.save();
};
