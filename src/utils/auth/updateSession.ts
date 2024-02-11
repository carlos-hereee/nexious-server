import type { AuthRequest } from "@app/auth";
import { generateHash } from "@utils/auth/generateHash";
import { random } from "./makeSession";

export const updateSession = async (req: AuthRequest) => {
  const salt = random();
  const sessionId = generateHash(salt, req.user.userId);
  req.user.auth.sessionId = sessionId;
  await req.user.save();
};
