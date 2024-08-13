import type { Document, Schema } from "mongoose";
import type { Express } from "express";
import type { UserRole } from "./user";

export type ObjectId = Schema.Types.ObjectId;
export type ExpressApp = Express;
export interface Messages {
  uid: string;
  data: string;
  title: string;
  status: string;
  user: ObjectId;
  recipient: ObjectId;
  recipientRole: UserRole;
  replies: { user: ObjectId; data: string; uid: string }[];
}
export interface IMessage extends Messages, Document {
  _id: ObjectId;
}
export interface NotificationSchema {
  notificationId?: string;
  category: "user" | "app" | "store-merch" | "orders" | "store" | "cal-event";
  message: string;
  link: string;
  name: string;
}
export interface INotificationSchema extends NotificationSchema, Document {
  _id: ObjectId;
  notificationId: string;
}
export interface PostSchema {
  postId?: string;
  appId?: string;
  uid?: string;
  body: string;
  thumbnail: string;
  link: string;
}
export interface IPostSchema extends PostSchema, Document {
  _id: ObjectId;
}
