import type { Schema } from "mongoose";
import type { Express, NextFunction, Request, Response } from "express";
import type Stripe from "stripe";
import type { IUserSchema } from "./user";
import type { IAppSchema } from "./app";
import type { IFile } from "./assets";
import type { IPage } from "./page";

export type ObjectId = Schema.Types.ObjectId;
export type ExpressApp = Express;

// define initial custom properties
export interface MiddlewareRequest extends Request {
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
  user?: IUserSchema;
  cart?: any;
  apps?: IAppSchema;
  asset?: string;
  file?: IFile;
  calendar?: any;
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
export interface AppRequest extends Request {
  apps: IAppSchema;
  asset: string;
}
// custom middleware error handling
export type GenericErrorProps = (res: Response, error: unknown, message: string) => void;
// generic express props
export type RouterProps = (req: Request, res: Response) => void;
// initial middleware props
export type MiddlewareProps = (req: MiddlewareRequest, res: Response, next: NextFunction) => void;
// after successful user middleware
export type UserRequestware = (req: UserRequest, res: Response, next: NextFunction) => void;
// after successful stripe middleware
export type StripeRequestware = (req: StripeRequest, res: Response, next: NextFunction) => void;
// after successful app middleware
export type AppRequestware = (req: AppRequest, res: Response, next: NextFunction) => void;
