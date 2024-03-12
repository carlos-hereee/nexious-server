import type { Document } from "mongoose";
import { ObjectId } from "./db";
import { AuthSchema } from "./auth";

// user
export interface UserFilters {
  username?: string;
  sessionId?: string;
  email?: string;
  all?: boolean;
  appId?: string;
  userId?: string;
  id?: ObjectId;
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
  permissions: { appId: ObjectId; role: string }[];
  auth: ObjectId;
  ownedApps: ObjectId[];
  subscriptions: ObjectId[];
}
export interface InitUser {
  username: string;
  userId: string;
  auth: AuthSchema;
  email?: string;
  phone?: number;
}
