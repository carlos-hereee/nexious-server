import type { Document } from "mongoose";
import type { IUserAuth } from "./auth";
import { ObjectId } from "./db";

// user
export interface UserFilters {
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
  permissions: { appId: ObjectId; role: string }[];
  auth: IUserAuth;
  ownedApps: ObjectId[];
  subscriptions: ObjectId[];
}
export interface InitUser {
  username: string;
  userId: string;
  auth: IUserAuth;
  email?: string;
  phone?: number;
}
