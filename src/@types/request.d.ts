// import type { IAppSchema } from "./app";
// import type { IPage } from "./page";
// import type Stripe from "stripe";
// import type { CartBody, IStoreSchema, RequestCart, RequestStore } from "./store";
// import type { IFile } from "./assets";
// import type { IAuth } from "./auth";
import type { IUserSchema } from "./user";
import type { CartBody, IStoreSchema, RequestStore } from "./store";
import type { Request } from "express";
import Stripe from "stripe";

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
export interface DeserializeUserRequest extends Request {
  cookies: { [cookieName: string]: string | undefined };
  user?: IUserSchema | null;
}
export interface CartRequest extends Request {
  body: {
    cart: CartBody;
  };
  // cart: RequestCart[];
}
export interface StoreRequest extends Request {
  body: RequestStore;
  store?: IStoreSchema | null;
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
