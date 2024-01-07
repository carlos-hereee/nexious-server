import jwt from "jsonwebtoken";

export type JWTPayloadProps = string | jwt.JwtPayload;
export type JWTVerifyErrors = jwt.VerifyErrors;
export interface JWTDecodedProps {
  username?: string;
  sessionId?: string;
}
export interface JWTVerifyPayload {
  username: string;
  sessionId: string;
  error: {
    expired: boolean;
    status: number;
    message: string;
  };
}
