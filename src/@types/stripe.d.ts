import type { IAppSchema } from "./app";
import type { IStoreSchema, MerchBody, StoreBody } from "./store";
import type Stripe from "stripe";
import type { IUserSchema } from "./user";

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
  store: IStoreSchema;
  myApp: IAppSchema;
  user: IUserSchema;
  body: StoreBody;
  asset: string;
}
export interface MerchRequest {
  store: IStoreSchema;
  myApp: IAppSchema;
  user: IUserSchema;
  body: MerchBody;
  asset: string;
}
