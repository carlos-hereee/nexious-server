import type { IAppSchema } from "./app.js";
import type { IStoreSchema, MerchBody, StoreBody } from "./store.js";
import type Stripe from "stripe";
import type { IUserSchema } from "./user.js";

export interface StripeTransferRequest {
  id: string;
  amount: number;
  destination: string;
}
export interface StripeRequestOptions {
  id?: string;
  limit?: number;
  transfer?: Stripe.TransferReversalCreateParams;
  options?: Stripe.RequestOptions;
  account?: Stripe.AccountUpdateParams;
}
export interface StripeAccountRequest {
  id: string;
  account: Stripe.AccountUpdateParams;
}

export interface StoreRequest {
  myApp: IAppSchema;
  user: IUserSchema;
  body: StoreBody;
  asset: string;
  store?: IStoreSchema;
}
export interface MerchRequest {
  store: IStoreSchema;
  myApp: IAppSchema;
  user: IUserSchema;
  body: MerchBody;
  asset: string;
}
export interface StripeSession {
  id: string;
  options?: Stripe.Checkout.SessionRetrieveParams;
}
