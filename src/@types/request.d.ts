import type { IUserSchema } from "./user";
import type { IStoreSchema, MerchBodyParams, RequestStore, StoreBody } from "./store";
import type { Request } from "express";
import Stripe from "stripe";
import { AuthBody, IAuth } from "./auth";
import { IAppSchema } from "./app";
import { IFile } from "./assets";
import { ICalendarSchema } from "./calendar";
import { IPageSchema } from "./page";

export interface FileRequest extends Request {
  file: IFile;
  files: { hero: IFile[]; sectionHero: IFile[] };
  asset: string;
  assets: { hero: string; sectionHero: string[] };
}

export interface StoreRequest<B> extends Request {
  body: B;
  asset?: string;
  store?: IStoreSchema | null;
  myApp?: IAppSchema | null;
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
  store?: IStoreSchema | null;
  stripeEvent?: Stripe.Event;
}
export interface InitRequest extends Request {
  user?: IUserSchema;
  cookies: { [cookieName: string]: string };
}
export interface AuthRequest extends InitRequest {
  user: IUserSchema;
  body: AuthBody;
}
// defined custom properties after passing middleware requirements
export interface UserRequest extends AuthRequest {
  params: {
    appId: string;
    username: string;
  };
  // body: AuthBody;
  user: IUserSchema;
  myApp?: IAppSchema;
  auth?: IAuth;
}

export interface AppRequest extends Request {
  params: {
    appId: string;
    appName: string;
    locale: string;
  };
  myApp: IAppSchema;
  user: IUserSchema;
  asset: string;
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
