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
export interface PhoneNotificationSettings {
  subscriptionRenewal: boolean;
  milestones: boolean;
  loginAlerts: boolean;
  accountChanges: boolean;
  suspiciousActivity: boolean;
}
export interface NSettings {
  // account notifications
  muteAllAccount: boolean;
  newFeatures: boolean;
  promotionalNotifications: boolean;
  milestones: boolean;
  subscriptionRenewal: boolean;
  //
  // auth notifications  RESEARCH IF SHOULD INCLUDE
  loginAlerts: boolean;
  accountChanges: boolean;
  suspiciousActivity: boolean;

  // checkout notifications
  muteAllCheckout: boolean;
  orderConfirmations: boolean;
  paymentReceipts: boolean;
  // calendar
  muteAllCalendar: boolean;
  eventReminders: boolean;
  taskReminders: boolean;
  calendarChanges: boolean;
  // app notifications
  storeChanges: boolean;
  appChanges: boolean;
  newFeatureActivity: boolean;
  // social notifications
  muteAllSocial: boolean;
  messages: boolean;
  mentionsTags: boolean;
  activityAlerts: boolean;
}
export interface NotificationSettings {
  notifications: NSettings;
  email: NSettings;
  phone: PhoneNotificationSettings;
}
export type UserRole = "customer" | "dev-team" | "app-support" | "owner" | "app-owner" | "friend" | "user";

export interface UserSchema {
  customerId?: string;
  calendarEvents?: ObjectId[];
  boards?: {
    boardUid: string;
    boardId: ObjectId;
    role: string;
  }[];
}

export interface IUserSchema extends UserSchema, Document {
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
  likePosts: string[];
  likeMessages: string[];
  name: string;
  isPlatformOwner: boolean;
  notificationSettings?: NotificationSettings;
  permissions: { appId: ObjectId; role: string }[];
  auth: ObjectId;
  ownedApps: ObjectId[];
  subscriptions: string[];
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
