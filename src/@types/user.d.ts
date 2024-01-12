import type { Document } from "mongoose";

// user
export interface GetUserProps {
  username?: string;
  sessionId?: string;
  email?: string;
  all?: boolean;
  appId?: string;
  userId?: string;
}
export interface IUserAuth {
  salt: string;
  sessionId: string;
  password: string;
  passwordHistory: string[];
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
export interface AuthBody {
  username: string;
  password: string;
  email?: string;
  phone?: number;
}
