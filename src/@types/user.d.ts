import type { Document } from "mongoose";
import type { AuthBody, IUserAuth } from "./auth";
import type { Request, NextFunction, Response } from "express";

// user
export interface GetUserProps {
  username?: string;
  sessionId?: string;
  email?: string;
  all?: boolean;
  appId?: string;
  userId?: string;
}

export interface IUserSchema extends Document {
  userId: string;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: number;
  locale: string;
  theme: string;
  hero: string;
  permissions: { appId: string; role: string }[];
  auth: IUserAuth;
  ownedApps: string[];
  subscriptions: string[];
}
export interface InitUser {
  username: string;
  // password: string;
  userId: string;
  auth: IUserAuth;
  email?: string;
  phone?: number;
}
// defined custom properties after passing middleware requirements
export interface UserRequest extends Request {
  user: IUserSchema | null;
  body: AuthBody;
}
export type UserRequestHandler = (req: UserRequest, res: Response, next: NextFunction) => void;
