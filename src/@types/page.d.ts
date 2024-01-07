import type { Document } from "mongoose";

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
export type RefsProps = {
  hasMedias?: IMediaItem[];
  hasCta?: ICta[];
  hasSections?: ISection[];
};

export interface Page {
  title: string;
  body: string;
  hero: string;
  hasCta: boolean;
  hasSections: boolean;
  cta: ICta[];
  sections: ISection[];
}
export interface IPage extends Document {
  title: string;
  body: string;
  pageId: string;
  userId: string;
  appId: string;
  hero: string;
  name: string;
  isStore: boolean;
  hasCta: boolean;
  hasSections: boolean;
  cta: ICta[];
  sections: ISection[];
}
export interface ILandingPage extends IPage {
  tagline: string;
}
export interface PageDataProps extends Page {
  subtitle: string;
  hasMedias: boolean;
  hero?: string;
  cta?: ICta;
  sections?: ISection;
}
