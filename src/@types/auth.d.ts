import type { CookieOptions, Response, Request, NextFunction } from "express";
import type { JwtPayload, VerifyErrors } from "jsonwebtoken";
import type { IUserSchema } from "./user";

export interface IUserAuth {
  salt: string;
  sessionId: string;
  password: string;
  passwordHistory: string[];
}
export interface IAuth {
  userId: string;
  email: string;
  auth: IUserAuth;
  username: string;
  phone: number;
}
export interface AuthBody {
  username: string;
  password: string;
  email?: string;
  phone?: number;
}
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

// defined custom properties after passing middleware requirements
export interface AuthRequest extends Request {
  user: IUserSchema;
  auth?: IAuth;
  body: AuthBody;
}
export type AuthRequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => void;
