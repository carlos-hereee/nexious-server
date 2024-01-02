import jwt  from "jsonwebtoken";
import { jwtPrivateKey }  from "@config";

export  (payload, expiresIn) => {
  return jwt.sign(payload, jwtPrivateKey, { algorithm: "HS256", expiresIn });
};
