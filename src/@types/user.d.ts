import type { Document } from "mongoose";
import type { IUserAuth } from "./auth";
import { ObjectId } from "./db";

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
  _id: ObjectId;
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
