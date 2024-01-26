import jwt from "jsonwebtoken";
import { jwtPrivateKey } from "@config";
import message from "@data/error.message.json" assert { type: "json" };
import type { JWTVerifyPayload, JWTDecodedProps } from "@app/auth.js";

export const verifyJWT = (token: string): JWTVerifyPayload => {
  let verification = {
    username: "",
    sessionId: "",
    error: { status: 0, expired: false, message: "" },
  };

  jwt.verify(token, jwtPrivateKey, (err, decoded) => {
    const code = decoded as JWTDecodedProps;
    const isExpired = err ? err.message.includes("jwt expired") : false;
    verification = {
      username: code?.username || "",
      sessionId: code?.sessionId || "",
      error: {
        expired: isExpired,
        status: isExpired ? 401 : 403,
        message: isExpired ? message.payloadExpired : message.notVerfifed,
      },
    };
  });
  return verification;
};
