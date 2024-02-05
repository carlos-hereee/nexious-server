import type { IAppSchema } from "./app";
import type { IPage } from "./page";
import type Stripe from "stripe";
import type { IUserSchema } from "./user";
import type { IStoreSchema } from "./store";
import type { IFile } from "./assets";
import type { IAuth } from "./auth";

export {};
declare global {
  namespace Express {
    interface Request {
      // params cannot be initialy undefined
      // params: {
      //   appId: string;
      //   appName: string;
      //   username: string;
      //   pageId: string;
      //   assetId: string;
      // };
      auth?: IAuth;
      // undefined properties because they have yet to be included
      page?: IPage | null;
      user?: IUserSchema | null;
      store?: IStoreSchema | null;
      myApp?: IAppSchema | null;
      asset?: string;
      file?: IFile;
      calendar?: any;
      cart?: any;
      assets?: { hero: string; sectionHero: string[] };
      files?: { hero: IFile; sectionHero: IFile[] };
      stripeEvent?: Stripe.Event;
    }
  }
}
