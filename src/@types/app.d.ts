import type { ObjectId } from "./db";
import type { ILandingPage } from "./page";
import type { Document } from "mongoose";

export interface GetAppProps {
  appId?: string;
  appName?: string;
  appIds?: string[];
  ownerId?: string;
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
export interface IMedia {
  title: string;
  subtitle: string;
  hasMedias: boolean;
  hero: string;
  medias: IMediaItem[];
}
export interface IMenu {
  name: string;
  value: string;
  link: string;
  label: string;
  category: string;
  icon?: string;
  hero?: string;
  menuId?: string;
  uid?: string;
  isToggle?: boolean;
  isPrivate?: boolean;
  isPage?: boolean;
  isStore?: boolean;
}
export interface IAppSchema extends Document {
  appId: string;
  appName: string;
  locale: string;
  country: string;
  email: string;
  appUrl: string;
  logo: string;
  owner: ObjectId;
  adminIds: { userId: string; role: string }[];
  languageList: ILanguageList[];
  themeList: IThemeList[];
  landing: ILandingPage;
  newsletter: INewsletter;
  media: IMedia;
  menu: IMenu[];
  calendar: ObjectId;
  store: ObjectId;
  pages: ObjectId[];
}
export interface AppPayload {
  appName: string;
  logo: string;
  owner: ObjectId;
  adminIds: { userId: ObjectId; role: string }[];
  themeList: IThemeList[];
  appUrl: string;
}
export interface AppReqBody {
  appName: string;
}
