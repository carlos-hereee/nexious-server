import type { Document, Schema } from "mongoose";
import type { Express } from "express";
import type { NSettings, UserRole } from "./user";

export type ObjectId = Schema.Types.ObjectId;
export type ExpressApp = Express;
export type MessageReadReceipts = "sent" | "delivered" | "read" | "unsent";
export interface UserPostData {
  avatar: string;
  name: string;
  userId: string;
  role: UserRole;
}
export interface Messages {
  uid: string;
  messageId: string;
  data: string;
  title: string;
  status: {
    messageLikes: string[];
    reaction: string;
    messageStatus: string;
    likeCount: number;
    star?: number;
    nestLevel: number;
  };
  user: UserPostData;
  recipient: UserPostData;
  replies: ObjectId[];
}
export interface IMessage extends Messages, Document {
  _id: ObjectId;
}
export interface NotificationSchema {
  notificationId?: string;
  name: string;
  category: keyof NSettings;
  message?: string;
  link?: string;
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
  createdBy: UserPostData;
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
