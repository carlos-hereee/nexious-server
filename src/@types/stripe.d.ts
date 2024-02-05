import type { IAppSchema } from "./app";
import type { IStoreSchema, MerchBody, StoreBody } from "./store";
import type Stripe from "stripe";
import type { IUserSchema } from "./user";

export interface StripeFundParams {
  id?: string;
  fundOptions?: Stripe.TopupUpdateParams;
  stripeAccount?: Stripe.RequestOptions;
  updateFunds?: Stripe.TopupCreateParams;
  listLimit?: number;
  searchOptions?: Stripe.TopupRetrieveParams;
  cancelOptions?: Stripe.TopupCancelParams;
}

export interface StripeProductParams {
  id?: string;
  productOptions?: Stripe.ProductUpdateParams;
  priceOptions?: Stripe.PriceCreateParams;
  addProductOptions?: Stripe.ProductCreateParams;
  stripeAccount?: Stripe.RequestOptions;
}
export interface StripeSession {
  id?: string;
  stripeAccount?: Stripe.RequestOptions;
  options?: Stripe.Checkout.SessionRetrieveParams;
  listOptions?: Stripe.Checkout.SessionListLineItemsParams;
  sessionOptions?: Stripe.Checkout.SessionCreateParams;
}

export interface StripePaymentIntentParams {
  id?: string;
  accountId?: string;
  listLimit?: number;
  initentOptions?: Stripe.PaymentIntentCreateParams;
  invoiceOptions?: Stripe.InvoiceLineItemListParams;
}
export interface StripePersonParams {
  id?: string;
  accountId?: string;
  listLimit?: number;
  personOptions?: Stripe.PersonRetrieveParams;
  addOptions?: Stripe.PersonCreateParams;
}
export interface StripeTransferParams {
  id?: string;
  transferId?: string;
  listLimit?: number;
  transferOptions?: Stripe.TransferCreateParams;
  updateOptions?: Stripe.TransferUpdateParams;
  reversalOptions?: Stripe.TransferReversalUpdateParams;
  options?: Stripe.RequestOptions;
  transferReversalOptions?: Stripe.TransferReversalCreateParams;
}

export interface StripeSecretParams {
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
