import type { Document } from "mongoose";

export interface GetMerchProps {
  storeId?: string;
  appId?: string;
  merchId?: string;
  merchIds?: string;
  id?: string;
  deleteMany?: boolean;
}
export interface MerchSchema {
  storeId: string;
  description: string;
  name: string;
  cost: number;
  inStock: number;
  uid?: string;
  merchId?: string;
  productId?: string;
  priceId?: string;
  hero?: string;
}
export interface IMerchSchema extends MerchSchema, Document {
  storeId: string;
  uid?: string;
  merchId?: string;
  productId: string;
  priceId: string;
  hero: string;
  name: string;
  description: string;
  inStock: number;
  cost: number;
}
export interface IStoreSchema extends Document {
  ownerId: string;
  appId: string;
  storeId: string;
  accountId: string;
  currency: string;
  name: string;
  pageName: string;
  title: string;
  body: string;
  email: string;
  hero: string;
  isRegistered: boolean;
  termsOfService: boolean;
  inventory: string[];
}
export interface MerchBody {
  name: string;
  description: string;
  inStock: number;
  cost: number;
  hero: string;
}
export interface StoreBody {
  name: string;
  email: string;
  title: string;
  body: string;
  pageName: string;
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
