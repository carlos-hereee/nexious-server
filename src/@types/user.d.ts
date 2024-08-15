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
export type UserRole = "customer" | "dev-team" | "app-support" | "owner" | "app-owner" | "friend";

export interface IUserSchema extends Document {
  _id: ObjectId;
  userId: string;
  username: string;
  accountTier?: ObjectId;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  locale: string;
  theme: string;
  role: UserRole;
  customerId?: string;
  name: string;
  isPlatformOwner: boolean;
  permissions: { appId: ObjectId; role: string }[];
  auth: ObjectId;
  ownedApps: ObjectId[];
  subscriptions: ObjectId[];
  notifications: ObjectId[];
  archivedNotifications: ObjectId[];
  accountTiers: ObjectId[];
  feed: ObjectId[];
  orders: ObjectId[];
  messages: ObjectId[];
}
export interface InitUser {
  username: string;
  userId: string;
  auth: AuthSchema;
  email?: string;
  phone?: number;
}
