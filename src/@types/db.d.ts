import type { Schema } from "mongoose";
import type { Express, Request } from "express";
import type Stripe from "stripe";
import type { AuthBody, IUserSchema } from "./user";
import type { IAppSchema } from "./app";
import type { IFile } from "./assets";
import type { IPage } from "./page";
import type { IStoreSchema } from "./store";

export type ObjectId = Schema.Types.ObjectId;
export type ExpressApp = Express;

// export {};
// declare global {
//   namespace Express {
//     interface Request {
//       // params cannot be initialy undefined
//       params: {
//         appId: string;
//         appName: string;
//         username: string;
//         pageId: string;
//         assetId: string;
//       };
//       // undefined properties because they have yet to be included
//       page?: IPage;
//       stripeEvent?: Stripe.Event;
//       user?: IUserSchema | null;
//       store?: IStoreSchema | null;
//       cart?: any;
//       myApp?: IAppSchema | null;
//       asset?: string;
//       file?: IFile;
//       calendar?: any;
//       assets?: { hero: string; sectionHero: string[] };
//       files?: { hero: IFile; sectionHero: IFile[] };
//     }
//   }
// }
// define initial custom properties
export interface MiddlewareRequest extends Request {
  // undefined properties because they have yet to be included
  page?: IPage;
  stripeEvent?: Stripe.Event;
  user?: IUserSchema | null;
  cart?: any;
  myApp?: IAppSchema | null;
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
  body: AuthBody;
}
// defined custom properties after passing middleware requirements
export interface AuthRequest extends Request {
  // req: {
  //       store?: IStoreSchema | null;
  //       cart?: any;
  //       myApp?: IAppSchema | null;
  //       asset?: string;
  //       file?: IFile;
  //       calendar?: any;
  //       assets?: { hero: string; sectionHero: string[] };
  //       files?: { hero: IFile; sectionHero: IFile[] };
  //     }
  //   }
  // }
  // define initial custom properties
  // userId: string;
  // email: string;
  // username: string;
  // auth: { salt: string; password: string; sessionId: string; passwordHistory: string[] };
  // phone: number;
  // };
  user?: IUserSchema;
  body: AuthBody;
}
export interface StripeRequest extends Request {
  stripeEvent: Stripe.Event;
}

export interface PageRequest extends Request {
  asset: string;
  params: { appId: string; pageId: string };
  myApp: IAppSchema;
  files: { hero: IFile; sectionHero: IFile[] };
}
