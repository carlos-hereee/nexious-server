import jwt from "jsonwebtoken";
import { jwtPrivateKey } from "@config";

export const signJWT = (payload: string, expiresIn: number) => {
  return jwt.sign(payload, jwtPrivateKey, { algorithm: "HS256", expiresIn });
};
