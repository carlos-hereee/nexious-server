import type { IUserSchema } from "./user";
import type { IStoreSchema, MerchBodyParams, RequestStore, StoreBody } from "./store";
import type { Request } from "express";
import type Stripe from "stripe";
import type { AuthBody, IAuth } from "./auth";
import type { IAppSchema } from "./app";
import type { IFile } from "./assets";
import type { ICalendarSchema } from "./calendar";
import type { IPageSchema } from "./page";

// initial request
export interface InitRequest extends Request {
  cookies: { [cookieName: string]: string };
  // optional due to issues with PathParams
  user: IUserSchema | null;
}
// defined custom properties after passing middleware requirements
export interface AuthRequest extends Request {
  params: {
    userId: string;
    appId: string;
  };
  auth: IAuth | null;
  body: AuthBody;
  user: IUserSchema | null;
}
export interface AppRequest extends Request {
  params: {
    appId: string;
    locale: string;
  };
  file: IFile;
  files: { hero: IFile[]; sectionHero: IFile[] };
  asset: string;
  assets: { hero: string; sectionHero: string[] };
}
export interface AppUpdateRequest<B> extends Request {
  body: B;
  params: {
    appId: string;
    assetId: string;
    merchId: string;
    appName: string;
    locale: string;
  };
  myApp: IAppSchema;
  user: IUserSchema;
  asset: string;
}

export interface FileRequest extends Request {
  file?: IFile;
  files?: { hero: IFile[]; sectionHero: IFile[] };
  asset: string;
  assets: { hero: string; sectionHero: string[] };
}

export interface StoreRequest<B> extends Request {
  body: B;
  asset?: string;
  store?: IStoreSchema;
  myApp?: IAppSchema;
}
export interface StoreRemovalRequest extends Request {
  store: IStoreSchema;
  myApp: IAppSchema;
}
export interface StoreCreateRequest extends Request {
  body: StoreBody;
  store: IStoreSchema;
  user: IUserSchema;
  myApp: IAppSchema;
  asset?: string;
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

export interface CalendarRequest extends Request {
  params: {
    appId: string;
  };
  calendar: ICalendarSchema;
}
export interface PageRequest extends Request {
  params: {
    pageId: string;
  };
  page: IPageSchema;
}
