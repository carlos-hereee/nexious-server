import type { IUserSchema } from "./user";
import type { CartBody, IStoreSchema, MerchBodyParams, RequestStore, StoreBody } from "./store";
import type { Request } from "express";
import Stripe from "stripe";
import { AuthBody, IAuth } from "./auth";
import { IAppSchema } from "./app";
import { IFile } from "./assets";
import { ICalendarSchema } from "./calendar";
import { IPageSchema } from "./page";
// import { ObjectId } from "./db";

export interface FileRequest extends Request {
  file: IFile;
  files: { hero: IFile[]; sectionHero: IFile[] };
  asset: string;
  assets: { hero: string; sectionHero: string[] };
}
export interface DeserializeUserRequest extends Request {
  cookies: { [cookieName: string]: string | undefined };
  user?: IUserSchema | null;
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
export interface StripeCheckoutSessionRequest extends Request {
  body: {
    cart: CartBody;
  };
}
// defined custom properties after passing middleware requirements
export interface UserRequest extends Request {
  params: {
    appId: string;
    username: string;
  };
  user?: IUserSchema | null;
  body: AuthBody;
}
// defined custom properties after passing middleware requirements
export interface AdminRequest extends Request {
  params: {
    appId: string;
  };
  user: IUserSchema;
  body: AuthBody;
}
export interface UserAuthRequest extends Request {
  body: AuthBody;
  user: IUserSchema;
  auth: IAuth;
}
export interface AppRequest<B> extends Request {
  body: B;
  params: {
    appId: string;
    appName: string;
    assetId: string;
    merchId: string;
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
