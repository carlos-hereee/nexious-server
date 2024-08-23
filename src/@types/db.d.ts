import type { Document, Schema } from "mongoose";
import type { Express } from "express";
import type { UserRole } from "./user";

export type ObjectId = Schema.Types.ObjectId;
export type ExpressApp = Express;
export type MessageReadReceipts = "sent" | "delivered" | "read" | "unsent";
export interface Messages {
  uid: string;
  messageId: string;
  data: string;
  title: string;
  status: {
    messageLikes: string[];
    reaction: string;
    messageStatus: string;
    linkCount: number;
  };
  user: { avatar: string; name: string; userId: string };
  recipient: { avatar: string; name: string; userId: string; role: UserRole };
  replies: {
    user: { avatar: string; name: string; userId: string };
    data: string;
    uid?: string;
    replyId?: string;
  }[];
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
  likeCount: number;
  likeUsers: string[];
  comments?: ObjectId[];
  pinnedComment?: ObjectId[];
  thumbnail: string;
  link: string;
}
export interface IPostSchema extends PostSchema, Document {
  postId: string;
  comments: ObjectId[];
  uid: string;
  _id: ObjectId;
}
