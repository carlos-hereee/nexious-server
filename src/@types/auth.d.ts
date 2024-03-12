import type { CookieOptions, Response } from "express";
import type { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Document } from "mongoose";
import { ObjectId } from "./db";

export interface AuthSchema {
  salt: string;
  sessionId: string;
  password: string;
  passwordHistory: string[];
}
export interface IAuthSchema extends AuthSchema, Document {
  _id: ObjectId;
}
export interface IAuth {
  userId: string;
  email: string;
  auth: AuthSchema;
  username: string;
  phone: number;
}
export interface AuthBody {
  username: string;
  password: string;
  newPassword: string;
  oldPassword: string;
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
  error: string;
}
export type StoreCookiesProps = (res: Response, username: string, sessionId: string) => { accessToken: string };

export type SignJWTProps = (payload: { username?: string; sessionId: string }, expiresIn: string) => string;
export type CookieConfigProps = (hour: number) => CookieOptions;
export type ResetCookieConfigProps = (res: Response) => void;
