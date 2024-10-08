import type { Request } from "express";
import type { Document } from "mongoose";
import type { ObjectId } from "./db";
// import type { ILandingPage } from "./page";
import type { IUserSchema, NSettings } from "./user";
import { IStoreSchema, MerchSchema } from "./store";

// export type NotificationType =
//   | "add-merch"
//   | "edit-user"
//   | "cal-event"
//   | "order-paid"
//   | "order-in-store"
//   | "edit-merch"
//   | "edit-calendar"
//   | "edit-store"
//   | "app-update"
//   | "update-account"
//   | "add-store";
export interface FormatNotification {
  type: keyof NSettings;
  user: IUserSchema | null;
  merch?: MerchSchema;
  store?: IStoreSchema;
  message?: string;
  link?: string;
  name?: string;
}
export interface AppFilters {
  appId?: string;
  accountId?: string;
  storeId?: string;
  type?: "add-notification" | "remove-notification";
  id?: ObjectId;
  appName?: string;
  appIds?: string[];
  notificationId?: ObjectId;
  ownerId?: ObjectId;
  all?: boolean;
  locale?: string;
}
export interface SubscriptionSchema {
  thumbnail: string;
  name: string;
  description: string;
  recurring: "day" | "month" | "week" | "year";
  cost: number;
  productId?: string;
  priceId?: string;
  lookUpKey?: string;
  link: string;
  addFeatures?: boolean;
  isActive?: boolean;
  features: {
    featureId: string;
    name: string;
    value: string;
    valueType: "Checkbox" | "Message";
  }[];
}
export interface ISubscriptionSchema extends SubscriptionSchema, Document {
  subscriptionId: string;
  productId: string;
  priceId: string;
  isPlatformSubscription: boolean;
  isActive: boolean;
  link: string;
  _id: ObjectId;
}
export interface GetCalendarProps {
  appId?: string;
  calendarId?: string;
  adminIds?: string[];
}

// app
export interface ILanguageList {
  name: string;
  label: string;
  value: string;
  url: string;
  locale: string;
  uid?: string;
}
export interface IColor {
  primary: string;
  altPrimary: string;
  secondary: string;
  altSecondary: string;
}
export interface IThemeList {
  themeId?: string;
  uid?: string;
  name: string;
  value: string;
  label: string;
  colors: IColor;
  backgroundColors: IColor;
}
export interface INewsletter {
  title: string;
  subtitle: string;
  details: string;
  hero: string;
}
export interface IMediaItem {
  media: string;
  link: string;
  url: string;
  username: string;
  sharedKey?: string;
  uid?: string;
}
export interface EmailParams {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}
export interface IMedia {
  title: string;
  subtitle: string;
  hasMedias: boolean;
  hero: string;
  medias: IMediaItem[];
}
export interface IMenu {
  category: "page" | "store" | "calendar";
  value: string;
  link: string;
  label: string;
  icon?: string;
  uid?: string;
  menuId?: string;
}
export interface IAppSchema extends Document {
  _id: ObjectId;
  appId: string;
  appName: string;
  appLink: string;
  isFeatured?: string;
  locale: string;
  country: string;
  dbVersion: string;
  email: string;
  appUrl: string;
  logo: string;
  owner: ObjectId;
  adminIds: { userId: string; role: string }[];
  languageList: ILanguageList[];
  themeList: IThemeList[];
  landing: ObjectId;
  newsletter: INewsletter;
  media: IMedia;
  menu: IMenu[];
  calendar: ObjectId;
  taskBoard: ObjectId;
  taskBoards: ObjectId[];
  store: ObjectId;
  notifications: ObjectId[];
  archivedNotifications: ObjectId[];
  subscriptions: ObjectId[];
  subscribers: ObjectId[];
  posts: ObjectId[];
  archivePosts: ObjectId[];
  pages: ObjectId[];
  maps: ObjectId[];
  messages: ObjectId[];
}
export interface AppPayload {
  appName: string;
  logo: string;
  owner: ObjectId;
  adminIds: { userId: string; role: string }[];
  themeList: IThemeList[];
  appUrl: string;
}
export interface GridData {
  id: string;
  data: string;
  orientation: string;
  roomType: string;
  name: string;
  x: number;
  y: number;
}
export interface MapDimensions {
  width: number;
  length: number;
  unit: "cm" | "m" | "km";
}
export interface IMap {
  map: GridData[][];
  name: string;
  dimensions: MapDimensions;
  uid: string;
}
export interface IMapSchema extends IMap, Document {
  _id: ObjectId;
}
export interface AppBody {
  appName: string;
  theme: string;
  language: string;
  locale: string;
  icon?: string;
  logo: string;
  data: string;
  email: string;
  title: string;
  details: string;
  hero: string;
  subtitle: string;
}
export interface UpdateAppRequest extends Request {
  project: IAppSchema;
}
export interface AppDataRequest extends Request {
  user: IUserSchema;
  project: IAppSchema;
}

export interface InitAppRequest extends Request {
  user: IUserSchema;
  project?: IAppSchema;
  asset: string;
  body: AppBody;
}
export interface AppIdRequest {
  params: { appId: string };
  project?: IAppSchema;
}
