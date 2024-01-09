import type { IStoreSchema } from "./store";
import type Stripe from "stripe";

export interface StoreRequest {
  store: IStoreSchema;
}
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
