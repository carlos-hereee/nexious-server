import type { Document } from "mongoose";
import type { IMediaItem } from "./app";
import { ObjectId } from "./db";
// import { ObjectId } from "./db";

export interface PageFilters {
  pageId: string;
  appId: string;
}
// pages
export interface GetPagesProps {
  appId?: string;
  id?: ObjectId;
  languageId?: string;
  pageId?: string;
}

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
export interface RefsProps {
  hasMedias?: IMediaItem[];
  hasCta?: ICta[];
  hasSections?: ISection[];
}
export interface IPage {
  body?: string;
  pageId?: string;
  hero?: string;
  title?: string;
  name?: string;
  isStore?: boolean;
  hasCta?: boolean;
  hasSections?: boolean;
  cta?: ICta[];
  sections?: ISection[];
}
export interface IPageSchema extends Document {
  // require type of page
  type: "store" | "landing" | "page";
  // populate default values
  body?: string;
  _id?: ObjectId;
  pageId?: string;
  hero?: string;
  title?: string;
  name?: string;
  isStore?: boolean;
  hasCta?: boolean;
  hasSections?: boolean;
  cta?: ICta[];
  sections?: ISection[];
}

export interface PageDataProps {
  title: string;
  body: string;
  hero: string;
  tagline: string;
  subtitle: string;
  details: string;
  hasMedias: boolean;
  hasCta: boolean;
  hasSections: boolean;
  cta: ICta[];
  sections: ISection[];
}
