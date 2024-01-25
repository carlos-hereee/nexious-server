import type { IAppSchema } from "./app.js";
import type { IPage } from "./page.js";
import type Stripe from "stripe";
import type { IUserSchema } from "./user.js";
import type { IStoreSchema } from "./store.js";
import type { IFile } from "./assets.js";
import type { IAuth } from "./auth.js";

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
