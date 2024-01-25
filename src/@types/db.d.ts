import type { Schema } from "mongoose";
import type { Express, Request, NextFunction, Response } from "express";
import type Stripe from "stripe";
import type { IUserSchema } from "./user.js";
import type { IAppSchema } from "./app.js";
import type { IFile } from "./assets.js";
import type { IPage } from "./page.js";
import type { IStoreSchema } from "./store.js";
import type { AuthBody } from "./auth.js";

export type ObjectId = Schema.Types.ObjectId;
export type ExpressApp = Express;

// define initial custom properties
export interface MRequest extends Request {
  // undefined properties because they have yet to be included
  page?: IPage;
  stripeEvent?: Stripe.Event;
  user?: IUserSchema | null;
  cart?: any;
  myApp?: IAppSchema;
  asset?: string;
  file?: IFile;
  calendar?: any;
  store?: IStoreSchema;
  assets?: { hero: string; sectionHero: string[] };
  files?: { hero: IFile; sectionHero: IFile[] };
}
export type MiddlewareRequestHandler = (req: MRequest, res: Response, next: NextFunction) => void;

export interface StripeRequest extends Request {
  stripeEvent: Stripe.Event;
}

export interface PageRequest extends Request {
  asset: string;
  params: { appId: string; pageId: string };
  myApp: IAppSchema;
  files: { hero: IFile; sectionHero: IFile[] };
}
