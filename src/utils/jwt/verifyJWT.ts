import jwt from "jsonwebtoken";
import { jwtPrivateKey } from "@config";
import message from "@data/error.message.json";
import type { JWTDecodedProps, JWTPayloadProps, JWTVerifyErrors } from "server-auth-types";

export = (token: string) => {
  return jwt.verify(token, jwtPrivateKey, (err: JWTVerifyErrors, decoded: JWTPayloadProps) => {
    const code = decoded as JWTDecodedProps;
    const isExpired = err ? err.message.includes("jwt expired") : false;
    return {
      username: code?.username || "",
      sessionId: code?.sessionId || "",
      error: {
        err,
        expired: isExpired,
        status: isExpired ? 401 : 403,
        message: isExpired ? message.payloadExpired : message.notVerfifed,
      },
    };
  });
};
