import { sign } from "jsonwebtoken";
import { jwtPrivateKey } from "@utils/app/config";
import type { SignJWTProps } from "@app/auth";

export const signJWT: SignJWTProps = (payload, expiresIn) => {
  return sign(payload, jwtPrivateKey, { algorithm: "HS256", expiresIn });
};
