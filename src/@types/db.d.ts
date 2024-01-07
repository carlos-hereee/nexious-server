import type mongoose, { Schema } from "mongoose";
// user
export interface UserSchemaProps {
  username?: string;
  sessionId?: string;
  email?: string;
  all?: boolean;
  appId?: string;
  userId?: string;
}
export interface IUserAuth {
  salt: string;
  sessionId: string;
  password: string;
  passwordHistory: string[];
}
export interface IUserSchema extends mongoose.Document {
  userId: string;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: number;
  locale: string;
  theme: string;
  hero: string;
  permissions: { appId: string; role: string }[];
  auth: IUserAuth;
  ownedApps: string[];
  subscriptions: string[];
}

// pages
export interface ICta {
  label: string;
  link: string;
  icon: string;
  uid: string;
}
export interface ISection {
  title: string;
  body: string;
  sectionHero: string;
  uid: string;
}
export interface IPage {
  title: string;
  body: string;
  hero: string;
  hasCta: boolean;
  hasSections: boolean;
  cta: ICta[];
  sections: ISection[];
}
export interface ILandingPage extends IPage {
  tagline: string;
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
  menuId: string;
  uid: string;
  name: string;
  value: string;
  link: string;
  label: string;
  icon: string;
  hero: string;
  category: string;
  isToggle: boolean;
  isPrivate: boolean;
  isPage: boolean;
  isStore: boolean;
}
export interface IAppSchema extends mongoose.Document {
  // _id: string;
  appId: string;
  appName: string;
  locale: string;
  country: string;
  email: string;
  appUrl: string;
  logo: string;
  owner: Schema.Types.ObjectId;
  adminIds: { userId: string; role: string }[];
  languageList: ILanguageList[];
  themeList: IThemeList[];
  landing: ILandingPage;
  newsletter: INewsletter;
  media: IMedia;
  menu: IMenu[];
  calendar: Schema.Types.ObjectId;
  store: Schema.Types.ObjectId;
  pages: Schema.Types.ObjectId[];
}
