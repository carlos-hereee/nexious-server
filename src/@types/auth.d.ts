import type { JwtPayload, VerifyErrors } from "jsonwebtoken";

export type JWTPayload = JwtPayload;
export type JWTVerifyErrors = VerifyErrors;
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
