import { generateHash } from "@authUtils/generateHash.js";
import { random } from "@authUtils/random.js";

export const makeSession = (payload) => {
  const salt = random();
  return generateHash(salt, payload);
};
