import type { CookieOptions, Response } from "express";
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
export type StoreCookiesProps = (
  res: Response,
  username: string,
  sessionId: string
) => { accessToken: string };

export type SignJWTProps = (
  payload: { username?: string; sessionId: string },
  expiresIn: string
) => string;
export type CookieConfigProps = (hour: number) => CookieOptions;
export type ResetCookieConfigProps = (res: Response) => void;
