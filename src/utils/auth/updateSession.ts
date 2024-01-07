import generateHash from "../../utils/auth/generateHash";
import random from "../../utils/auth/random";

export const updateSession = async (req) => {
  const salt = random();
  const sessionId = generateHash(salt, req.user.userId);
  req.user.sessionId = sessionId;
  await req.user.save;
};
