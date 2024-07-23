import type { Document, Schema } from "mongoose";
import type { Express } from "express";

export type ObjectId = Schema.Types.ObjectId;
export type ExpressApp = Express;
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
  message: string;
  link: string;
  name: string;
}
export interface IPostSchema extends PostSchema, Document {
  _id: ObjectId;
  postId: string;
}
