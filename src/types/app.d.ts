import type { Request } from "express";
import type { Document } from "mongoose";
import type { ObjectId } from "./db";
// import type { ILandingPage } from "./page";
import type { IUserSchema } from "./user";
import { IStoreSchema, MerchSchema } from "./store";

export interface FormatNotification {
  type: "add-merch" | "edit-user" | "order-paid" | "order-in-store" | "edit-merch" | "edit-calendar" | "app-update";
  user?: IUserSchema;
  merch?: MerchSchema;
  store?: IStoreSchema;
  message?: string;
  link?: string;
}
export interface AppFilters {
  appId?: string;
  accountId?: string;
  type?: "add-notification";
  id?: ObjectId;
  appName?: string;
  appIds?: string[];
  notificationId?: ObjectId;
  ownerId?: ObjectId;
  all?: boolean;
  locale?: string;
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
  sharedKey?: string;
  uid?: string;
}
export interface EmailParams {
  from?: string;
  to: string;
  subject: string;
  text: string;
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
  store: ObjectId;
  notifications: ObjectId[];
  subscribers: ObjectId[];
  pages: ObjectId[];
}
export interface AppPayload {
  appName: string;
  logo: string;
  owner: ObjectId;
  adminIds: { userId: string; role: string }[];
  themeList: IThemeList[];
  appUrl: string;
}
export interface AppBody {
  appName: string;
  theme: string;
  language: string;
  locale: string;
  logo: string;
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
