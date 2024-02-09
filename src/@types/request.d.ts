import type { IUserSchema } from "./user";
import type { CartBody, IStoreSchema, MerchBodyParams, RequestStore, StoreBodyParams } from "./store";
import type { Request } from "express";
import Stripe from "stripe";
import { AuthBody, IAuth } from "./auth";
import { AppReqBody, IAppSchema } from "./app";

export interface DeserializeUserRequest extends Request {
  cookies: { [cookieName: string]: string | undefined };
  user?: IUserSchema | null;
}
export interface CartRequest extends Request {
  body: {
    cart: CartBody;
  };
}
export interface StoreRequest extends Request {
  body: RequestStore;
  asset?: string;
  store?: IStoreSchema | null;
  myApp?: IAppSchema | null;
}
export interface StoreRemovalRequest extends Request {
  store: IStoreSchema;
  myApp: IAppSchema;
}
export interface StoreCreateRequest extends Request {
  body: StoreBodyParams;
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
  user?: IUserSchema | null;
  body: AuthBody;
}
export interface UserAuthRequest extends Request {
  body: AuthBody;
  user: IUserSchema;
  auth: IAuth;
}
export interface AppRequest extends Request {
  params: {
    appId: string;
    appName: string;
    assetId: string;
  };
  myApp?: IAppSchema | null;
  user: IUserSchema;
  asset: string;
  body: AppReqBody;
}

// export {};
// declare global {
//   namespace Express {
//     interface Request {
//       // params cannot be initialy undefined
//       // params: {
//       //   appId: string;
//       //   appName: string;
//       //   username: string;
//       //   pageId: string;
//       //   assetId: string;
//       // };
//       body: {
//         cart?: CartBody;
//       };
//       auth?: IAuth;
//       cookies: { [cookieName: string]: string | undefined };
//       // undefined properties because they have yet to be included
//       page?: IPage | null;
//       user?: IUserSchema | null;
//       store?: IStoreSchema | null;
//       myApp?: IAppSchema | null;
//       asset?: string;
//       file?: IFile;
//       // calendar?: any;
//       cart?: RequestCart[];
//       assets?: { hero: string; sectionHero: string[] };
//       files?: { hero: IFile; sectionHero: IFile[] };
//       stripeEvent?: Stripe.Event;
//     }
//   }
// }
