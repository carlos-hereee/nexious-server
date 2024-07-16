import type { Document } from "mongoose";
import { ObjectId } from "./db";

export interface StoreFilters {
  storeId: string;
}
export interface UpdateStoreParams {
  accountId?: string;
  storeId?: string;
  orderId?: string;
  status?: "pending" | "awaiting-payment" | "completed" | "accepted" | "declined";
  paymentStatus?: "paid" | "unpaid" | "no_payment_required";
  order?: ObjectId | string;
  notification?: ObjectId;
  client?: ClientSchema;
  stripe?: StoreUpdateWithStripe;
  type?: "payment" | "stripe-account-updated" | "checkout-complete" | "payment-in-store" | "add-notification";
}
export interface GetMerchProps {
  storeId?: string;
  appId?: ObjectId;
  merchId?: string;
  orderId?: string;
  accountId?: string;
  merchIds?: string;
  id?: ObjectId;
  deleteMany?: boolean;
}
export interface MerchBody {
  name: string;
  hero: string;
  images: string;
  description: string;
  cost: string;
  inStock: string;
  catalog: string[];
}
export interface CheckoutMerch {
  productId?: string;
  merchId?: string;
  priceId: string;
  quantity: number;
}
export interface MerchSchema {
  storeId?: ObjectId;
  description: string;
  name: string;
  link: string;
  lookUpKey?: string;
  recurring?: "day" | "month" | "week" | "year";
  cost: number;
  inStock?: number;
  onHold?: number;
  uid?: string;
  merchId?: string;
  subscriptionId?: string;
  productId?: string;
  priceId?: string;
  hero?: string;
  thumbnail?: string;
  catalog?: string[];
}
export interface OrderMerchSchema {
  merchId: string;
  productId?: string;
  priceId?: string;
  paymentStatus?: "paid" | "unpaid" | "no_payment_required";
  quantity: number;
}
export interface ClientSchema {
  email: string;
  name?: string;
  phone: string;
  userId?: string;
  address?: {
    city: string | null;
    country: string | null;
    line1: string | null;
    line2: string | null;
    postal_code: string | null;
    state: string | null;
  };
}
export interface OrderStoreInfo {
  storeId: string;
  email: string;
  location: string;
  location2?: string;
}
export interface StoreSessionBody {
  cart: OrderMerchSchema[];
  client: ClientSchema;
}
export type OrderStatus = "pending" | "awaiting-payment" | "completed" | "accepted" | "declined";
export interface IOrderShema {
  client: ClientSchema;
  merch: OrderMerchSchema[];
  status: OrderStatus;
  orderId?: string;
  store?: OrderStoreInfo;
  statusReason?: string;
  paymentMethod?: "in-store" | "stripe" | "in-store-and-online";
  _id?: ObjectId;
}
export interface IMerchSchema extends MerchSchema, Document {
  hasCatalog: boolean;
  _id: ObjectId;
}
export interface StoreUpdateWithStripe {
  onBoardingRequired?: boolean;
  stripeDisabledReason?: string;
  isStripeActive?: boolean;
  // stripeCurrentlyDue?: string[] | null;
  // stripePassedDue?: string[] | null;
  // pendingVerification?: string[] | null;
  // stripePendingVerification?: string[] | null;
  // stripeDeadline?: number | null;
}
export interface StoreSchema {
  ownerId: ObjectId;
  appId: ObjectId;
  email: string;
  storeId?: string;
  storeLink?: string;
  storeUrl?: string;
  accountId?: string;
  stripeDisabledReason?: string;
  isStripeActive?: boolean;
  // stripeDeadline?: number;
  // stripeCurrentlyDue?: string[];
  // stripePassedDue?: string[];
  // stripePendingVerification?: string[];
  currency: string;
  storeName?: string;
  title?: string;
  body?: string;
  location?: string;
  location2?: string;
  hero?: string;
  isRegistered?: boolean;
  onBoardingRequired?: boolean;
  termsOfService?: boolean;
  orders: ObjectId[];
  inventory: ObjectId[];
  notifications: ObjectId[];
}
export interface IStoreSchema extends StoreSchema, Document {
  _id: ObjectId;
  storeId: string;
}
export interface MerchBodyParams {
  name: string;
  description: string;
  inStock: number;
  cost: number;
  hero: string;
  images?: string[];
}
export interface StoreBody {
  storeName: string;
  email: string;
  title: string;
  body: string;
  currency: string;
}
export interface CartBody {
  accountId: string;
  orderId?: string;
  paymentMethod?: "in-store" | "stripe" | "in-store-and-online";
  cart: {
    productId: string;
    priceId: string;
    merchId: string;
    quantity: number;
  }[];
  client: { username: string; name: string; phone: string; email: string };
}
export type StripeMerchData = RequestCart[];
export interface RequestCart {
  productId: string;
  quantity: number;
}
export interface RequestStore {
  name: string;
  body: string;
  title: string;
}
