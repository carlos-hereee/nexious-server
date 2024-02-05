import type { IAppSchema } from "./app";
import type { IStoreSchema, MerchBody, StoreBody } from "./store";
import type Stripe from "stripe";
import type { IUserSchema } from "./user";

export interface StripeTransferEventParams {
  id?: string;
  transferId?: string;
  listLimit?: number;
  transferOptions?: Stripe.TransferCreateParams;
  updateOptions?: Stripe.TransferUpdateParams;
  reversalOptions?: Stripe.TransferReversalUpdateParams;
  options?: Stripe.RequestOptions;
  transferReversalOptions?: Stripe.TransferReversalCreateParams;
}

export interface StripeSecretEventParams {
  listOptions?: Stripe.Apps.SecretListParams;
  findSecretOptions?: Stripe.Apps.SecretFindParams;
  secretOptions?: Stripe.Apps.SecretCreateParams;
  removeSecretOptions?: Stripe.Apps.SecretDeleteWhereParams;
}
export interface StripeAccountRequest {
  account?: Stripe.AccountUpdateParams;
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
