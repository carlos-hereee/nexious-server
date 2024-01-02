import jwt  from "jsonwebtoken";
import { jwtPrivateKey }  from "../../../config.env";

module.exports = (payload, expiresIn) => {
  return jwt.sign(payload, jwtPrivateKey, { algorithm: "HS256", expiresIn });
};
