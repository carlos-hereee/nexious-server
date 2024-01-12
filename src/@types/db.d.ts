import type { Schema } from "mongoose";
import type { Express, Request } from "express";
import type Stripe from "stripe";
import type { IUserSchema } from "./user";
import type { AppReqBody, IAppSchema } from "./app";
import type { IFile } from "./assets";
import type { IPage } from "./page";
import type { IStoreSchema } from "./store";

export type ObjectId = Schema.Types.ObjectId;
export type ExpressApp = Express;

export {};
declare global {
  namespace Express {
    interface Request {
      // params cannot be initialy undefined
      params: {
        appId: string;
        appName: string;
        username: string;
        pageId: string;
        assetId: string;
      };
      // undefined properties because they have yet to be included
      page?: IPage;
      stripeEvent?: Stripe.Event;
      user?: IUserSchema | null;
      store?: IStoreSchema | null;
      cart?: any;
      myApp?: IAppSchema | null;
      asset?: string;
      file?: IFile;
      calendar?: any;
      assets?: { hero: string; sectionHero: string[] };
      files?: { hero: IFile; sectionHero: IFile[] };
    }
  }
}
// define initial custom properties
export interface MiddlewareRequest extends Request {
  // undefined properties because they have yet to be included
  page?: IPage;
  stripeEvent?: Stripe.Event;
  user?: IUserSchema | null;
  cart?: any;
  myApp?: IAppSchema;
  asset?: string;
  file?: IFile;
  calendar?: any;
  store?: IStoreSchema | null;
  assets?: { hero: string; sectionHero: string[] };
  files?: { hero: IFile; sectionHero: IFile[] };
}

// defined custom properties after passing middleware requirements
export interface UserRequest extends Request {
  user: IUserSchema;
}
export interface StripeRequest extends Request {
  stripeEvent: Stripe.Event;
}
export interface UpdateAppRequest extends Request {
  myApp: IAppSchema;
}
export interface AppDataRequest extends Request {
  user: IUserSchema;
  myApp: IAppSchema;
}
export interface AppRequest extends Request {
  params: { appId: string; appName: string };
  myApp: IAppSchema;
  user: IUserSchema;
  asset: string;
  body: AppReqBody;
}
export interface InitAppRequest extends Request {
  user?: IUserSchema | null;
  myApp?: IAppSchema | null;
  asset?: string;
  body: AppReqBody;
}
export interface PageRequest extends Request {
  asset: string;
  params: { appId: string; pageId: string };
  myApp: IAppSchema;
  files: { hero: IFile; sectionHero: IFile[] };
}
