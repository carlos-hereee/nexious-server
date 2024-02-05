import jwt from "jsonwebtoken";
import { jwtPrivateKey } from "@appUtils/config";
import type { SignJWTProps } from "@app/auth";

export const signJWT: SignJWTProps = (payload, expiresIn) => {
  return jwt.sign(payload, jwtPrivateKey, { algorithm: "HS256", expiresIn });
};
