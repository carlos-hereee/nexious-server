import type { IUserSchema } from "./user";
import type { IMerchSchema, IStoreSchema, OrderStatus, RequestStore, StoreBody } from "./store";
import type { Request } from "express";
import type Stripe from "stripe";
import type { AuthBody, IAuthSchema } from "./auth";
import type { AppBody, IAppSchema, SubscriptionSchema } from "./app";
import type { IFile } from "./assets";
import type { CalendarBody, ICalendarSchema } from "./calendar";
import type { IPageSchema } from "./page";
import { PostBody } from "./post";
import { IPostSchema } from "./db";

export interface MinAppResponseData {
  user?: IUserSchema;
  app?: IAppSchema;
  appList?: IAppSchema[];
  posts?: IPostSchema[];
  platformTiers?: SubscriptionSchema[];
  store?: IStoreSchema;
  calendar?: ICalendarSchema;
  account?: Stripe.Response<Stripe.Account>;
}

// initial request
export interface InitRequest extends Request {
  cookies: { [cookieName: string]: string };
  // optional due to issues with PathParams
  user: IUserSchema | null;
  auth: IAuthSchema | null;
}
// defined custom properties after passing middleware requirements
export interface AuthRequest<B = AuthBody> extends Request {
  params: {
    userId: string;
    appId: string;
    username: string;
    notificationId: string;
  };
  body: B;
  auth: IAuthSchema;
  user: IUserSchema;
}

export interface AppRequest<B = AppBody> extends Request {
  params: {
    appId: string;
    notificationId: string;
    subscriptionId: string;
    locale: string;
    appName: string;
    assetId: string;
    pageId: string;
    menuId: string;
  };
  body: B;
  project: IAppSchema;
  page: IPageSchema;
  store?: IStoreSchema;
  pages: IPageSchema[];
  user: IUserSchema;
  calendar: ICalendarSchema;
  file: IFile;
  files: { hero: IFile[]; sectionHero: IFile[] };
  asset: string;
  assets: { hero: string; sectionHero: string[] };
  account?: Stripe.Response<Stripe.Account>;
}

export interface FileRequest extends Request {
  file: IFile;
  files: { hero?: IFile[]; sectionHero?: IFile[]; catalog?: IFile[] };
  asset: string;
  assets: { hero: string; sectionHero: string[]; catalog?: string[] };
}

export interface StoreRequest<B = StoreBody> extends Request {
  body: B;
  params: {
    storeId: string;
    accountId: string;
    appId: string;
    option: string;
    from: string;
    orderId: string;
    customer: string;
    merchId: string;
    orderUpdate: OrderStatus;
  };
  store: IStoreSchema;
  project: IAppSchema;
  user: IUserSchema;
  merch: IMerchSchema;
  asset?: string;
  assets: { hero: string; sectionHero: string[]; catalog: string[] };
  account?: Stripe.Response<Stripe.Account>;
}
export interface PostRequest<B = PostBody> extends Request {
  body: B;
  params: {
    appId: string;
  };
  store: IStoreSchema;
  project: IAppSchema;
  user: IUserSchema;
  merch: IMerchSchema;
  asset?: string;
  assets: { hero: string; sectionHero: string[]; catalog: string[] };
  account?: Stripe.Response<Stripe.Account>;
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
