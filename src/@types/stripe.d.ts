import type Stripe from "stripe";

export interface CheckoutPortalSession {
  customer: string;
}
export interface StripeConfirmation {
  status: string;
  paymentStatus: string;
  customer: string;
  mode: string;
  subscription: string;
  metadata: { [key: string]: string };
  intent: string;
  customerDetails: {
    email: string;
    name: string;
    phone: string;
  };
}
export interface CheckoutCompleteSession {
  accountId: string;
  sessionId: string;
  orderId?: string;
}
export interface StripeAccountParams {
  id?: string;
  accountId?: string;
  customer?: string;
  updateAccountCapability?: Stripe.CapabilityUpdateParams;
  updateAccount?: Stripe.AccountUpdateParams;
  rejectAccount?: Stripe.AccountRejectParams;
  accountCapabilityList?: Stripe.CapabilityListParams;
  accountCapability?: Stripe.CapabilityRetrieveParams;
  accountList?: Stripe.AccountListParams;
  addAccount?: Stripe.AccountCreateParams;
  accountSession?: Stripe.AccountSessionCreateParams;
  accountLink?: Stripe.AccountLinkCreateParams;
  stripeAccount?: Stripe.RequestOptions;
}
export interface StripeBankParams {
  id?: string;
  accountId?: string;
  stripeAccount?: Stripe.RequestOptions;
  externalAccount?: Stripe.ExternalAccountCreateParams;
  updateExternalBank?: Stripe.ExternalAccountUpdateParams;
}
export interface StripeCustomerParams {
  id?: string;
  updateCustomer?: Stripe.CustomerUpdateParams;
  customerList?: Stripe.CustomerListParams;
  getCustomer?: Stripe.CustomerRetrieveParams;
  addCustomer?: Stripe.CustomerCreateParams;
  removeCustomer?: Stripe.CustomerDeleteParams;
  stripeAccount?: Stripe.RequestOptions;
}

export interface StripeRadarParams {
  id?: string;
  stripeAccount?: Stripe.RequestOptions;
  updateRadar?: Stripe.Radar.ValueListUpdateParams;
  removeRadarItem?: Stripe.Radar.ValueListItemDeleteParams;
  removeRadarList?: Stripe.Radar.ValueListItemDeleteParams;
  reviewList?: Stripe.ReviewListParams;
  reviewOptions?: Stripe.ReviewRetrieveParams;
  radarList?: Stripe.Radar.ValueListItemListParams;
  radarListOptions?: Stripe.Radar.ValueListListParams;
  fruadList?: Stripe.Radar.EarlyFraudWarningListParams;
  addRadarItemOptions?: Stripe.Radar.ValueListItemCreateParams;
  addRadarList?: Stripe.Radar.ValueListCreateParams;
}
export interface StripeWebhookParams {
  id?: string;
  url?: string;
  list?: number;
  events?: Stripe.WebhookEndpointCreateParams.EnabledEvent[];
}
export interface StripeFeeParams {
  id?: string;
  refundId?: string;
  stripeAccount?: Stripe.RequestOptions;
  refundList?: Stripe.FeeRefundListParams;
  feeList?: Stripe.ApplicationFeeListParams;
  feeOptions?: Stripe.ApplicationFeeRetrieveParams;
}

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
  pricesOptions?: Stripe.PriceUpdateParams;
  addPriceOptions?: Stripe.PriceCreateParams;
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
export type StripeSuccessEvent = Stripe.PaymentIntentSucceededEvent;
export type StripePaymentIntentFailed = Stripe.PaymentIntentPaymentFailedEvent;
export type StripeSessionCompleteEvent = Stripe.CheckoutSessionCompletedEvent;
export type StripePaymentAttachedEvent = Stripe.PaymentMethodAttachedEvent;
export type StripeUpdateAccountEvent = Stripe.AccountUpdatedEvent;
