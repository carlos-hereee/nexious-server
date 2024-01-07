import generateHash from "@authUtils/generateHash";
import random from "@authUtils/random";

export const updateSession = async (req) => {
  const salt = random();
  const sessionId = generateHash(salt, req.user.userId);
  req.user.sessionId = sessionId;
  await req.user.save;
};
