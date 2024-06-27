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

export interface AccountTier {
  tier: "free" | "basic" | "advanced";
  tierId: string;
  calendarEvent: boolean;
  name: string;
  link: string;
  description: string;
  recurring: "monthly" | "yearly";
  features: { name: string; value: string; valueType: string }[];
  cost: number;
  calendarBooking: boolean;
  storeCheckout: boolean;
  maxApps: 1 | 3 | 10;
  maxPagesPerApp: 5 | 10 | 20;
}
export interface IUserSchema extends Document {
  _id: ObjectId;
  userId: string;
  username: string;
  accountTier: AccountTier;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  locale: string;
  theme: string;
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
}
export interface InitUser {
  username: string;
  userId: string;
  auth: AuthSchema;
  email?: string;
  phone?: number;
}
