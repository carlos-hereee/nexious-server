import jwt from "jsonwebtoken";
import { jwtPrivateKey } from "@config";
import type { SignJWTProps } from "@app/auth.js";

export const signJWT: SignJWTProps = (payload, expiresIn) => {
  return jwt.sign(payload, jwtPrivateKey, { algorithm: "HS256", expiresIn });
};
