import type { Document } from "mongoose";
import type { IMediaItem } from "./app";
import { ObjectId } from "./db";

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
  hasMedias: IMediaItem[];
  hasCta: ICta[];
  hasSections: ISection[];
}
export interface IPageB {
  name: string;
  title: string;
  tagline: string;
  body: string;
  hasCta: string;
  hasSections: string;
}
export interface IPage {
  // require type of page
  type: "store" | "landing" | "page";
  name: string;
  body?: string;
  pageLink?: string;
  pageId: string;
  hero?: string;
  title?: string;
  tagline?: string;
  isStore?: boolean;
  hasCta?: boolean;
  hasSections?: boolean;
  cta?: ICta[];
  sections?: ISection[];
}
export interface IPageSchema extends IPage, Document {
  // populate default values
  _id: ObjectId;
  hasCta: boolean;
  hasSections: boolean;
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
