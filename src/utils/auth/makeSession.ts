import { generateHash } from "@utils/auth/generateHash";
import crypto from "crypto";

export const random = () => crypto.randomBytes(128).toString("base64");
export const makeSession = (payload: string) => {
  const salt = random();
  return generateHash(salt, payload);
};
