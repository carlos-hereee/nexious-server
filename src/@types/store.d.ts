import type { Document } from "mongoose";
import { ObjectId } from "./db";

export interface StoreFilters {
  storeId: string;
}

export interface GetMerchProps {
  storeId?: string;
  appId?: ObjectId;
  merchId?: string;
  merchIds?: string;
  id?: ObjectId;
  deleteMany?: boolean;
}
export interface MerchSchema {
  storeId: ObjectId;
  description: string;
  name: string;
  cost: number;
  inStock: number;
  uid?: string;
  merchId?: string;
  productId?: string;
  priceId?: string;
  hero?: string;
  thumbnail?: string;
  catalog?: string[];
}
export interface IMerchSchema extends MerchSchema, Document {
  _id: ObjectId;
}
export interface StoreUpdateWithStripe {
  onBoardingRequired?: boolean;
  stripeDisabledReason?: string;
  stripeCurrentlyDue?: string[] | null;
  stripePassedDue?: string[] | null;
  pendingVerification?: string[] | null;
  stripePendingVerification?: string[] | null;
  stripeDeadline?: number | null;
}
export interface StoreSchema {
  ownerId: ObjectId;
  appId: ObjectId;
  email: string;
  storeId?: string;
  accountId?: string;
  stripeDisabledReason?: string;
  stripeDeadline?: number;
  stripeCurrentlyDue?: string[];
  stripePassedDue?: string[];
  stripePendingVerification?: string[];
  currency?: string;
  storeName?: string;
  title?: string;
  body?: string;
  hero?: string;
  isRegistered?: boolean;
  onBoardingRequired?: boolean;
  termsOfService?: boolean;
  inventory: ObjectId[];
}
export interface IStoreSchema extends StoreSchema, Document {
  _id: ObjectId;
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
}
export interface CartBody {
  accountId: string;
  merch: {
    productId: string;
    quantity: number;
  }[];
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
