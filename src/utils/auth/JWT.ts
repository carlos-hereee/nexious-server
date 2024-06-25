import { sign, verify } from "jsonwebtoken";
import { isDev, jwtPrivateKey } from "@utils/app/config";
import type { JWTVerifyPayload, JWTDecodedProps, SignJWTProps } from "types/auth";

// verfiry token with jwt
export const verifyJWT = (token: string): JWTVerifyPayload => {
  // key variables
  const verification = { username: "", sessionId: "", error: "" };
  verify(token, jwtPrivateKey, (error, decoded) => {
    // handle error
    if (error) {
      if (isDev) console.log("verifying JWT", error);
      // if expired
      const isExpired = error ? error.message.includes("jwt expired") : false;
      return (verification.error = isExpired ? "expired" : "error");
    }
    // assign verification
    const code = decoded as JWTDecodedProps;
    verification.username = code?.username || "";
    verification.sessionId = code?.sessionId || "";
  });
  return verification;
};
export const signJWT: SignJWTProps = (payload, expiresIn) => {
  return sign(payload, jwtPrivateKey, { algorithm: "HS256", expiresIn });
};
