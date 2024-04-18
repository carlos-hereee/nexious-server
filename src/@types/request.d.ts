import type { IUserSchema } from "./user";
import type { IStoreSchema, MerchBodyParams, RequestStore, StoreBody } from "./store";
import type { Request } from "express";
import type Stripe from "stripe";
import type { AuthBody, IAuthSchema } from "./auth";
import type { AppBody, IAppSchema } from "./app";
import type { IFile } from "./assets";
import type { CalendarBody, ICalendarSchema } from "./calendar";
import type { IPageSchema } from "./page";

// initial request
export interface InitRequest extends Request {
  cookies: { [cookieName: string]: string };
  // optional due to issues with PathParams
  user: IUserSchema | null;
  auth: IAuthSchema | null;
}
// defined custom properties after passing middleware requirements
export interface AuthRequest extends Request {
  params: {
    userId: string;
    appId: string;
    username: string;
  };
  auth: IAuthSchema;
  body: AuthBody;
  user: IUserSchema;
}

export interface AppRequest<B = AppBody> extends Request {
  params: { appId: string; locale: string; appName: string; assetId: string; pageId: string };
  body: B;
  project: IAppSchema;
  page: IPageSchema;
  pages: IPageSchema[];
  user: IUserSchema;
  file: IFile;
  files: { hero: IFile[]; sectionHero: IFile[] };
  asset: string;
  assets: { hero: string; sectionHero: string[] };
}

export interface FileRequest extends Request {
  file: IFile;
  files: { hero?: IFile[]; sectionHero?: IFile[] };
  asset: string;
  assets: { hero: string; sectionHero: string[] };
}

export interface StoreRequest<B = StoreBody> extends Request {
  body: B;
  asset?: string;
  store: IStoreSchema;
  project: IAppSchema;
  user: IUserSchema;
}
export interface StripeRequest extends Request {
  asset?: string;
  store: IStoreSchema;
  project: IAppSchema;
  user: IUserSchema;
}
export interface StoreRemovalRequest extends Request {
  store: IStoreSchema;
  project: IAppSchema;
}

export interface AddStoreMerchRequest extends Request {
  body: MerchBodyParams;
  store: IStoreSchema;
  asset?: string;
}
export interface StripeWebhookRequest extends Request {
  body: RequestStore;
  store?: IStoreSchema;
  stripeEvent?: Stripe.Event;
}

export interface CalendarRequest<B = CalendarBody> extends Request {
  params: {
    appId: string;
  };
  body: B;
  calendar: ICalendarSchema;
  project: IAppSchema;
  user: IUserSchema;
  asset?: string;
}
export interface PageRequest extends Request {
  params: {
    pageId: string;
  };
  page: IPageSchema;
}
