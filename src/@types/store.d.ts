import type { Document } from "mongoose";
import { ObjectId } from "./db";

export interface StoreFilters {
  storeId: string;
}
export interface StoreBodyParams {
  name: string;
  title: string;
  body: string;
  pageName: string;
  email?: string;
}
export interface GetMerchProps {
  storeId?: string;
  appId?: string;
  merchId?: string;
  merchIds?: string;
  id?: string;
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
}
export interface IMerchSchema extends MerchSchema, Document {
  _id: ObjectId;
}
export interface CreateStoreSchema {
  ownerId: ObjectId;
  appId: ObjectId;
  email: string;
  storeId: string;
  accountId?: string;
  currency?: string;
  name?: string;
  pageName?: string;
  title?: string;
  body?: string;
  hero?: string;
  isRegistered?: boolean;
  termsOfService?: boolean;
  inventory: ObjectId[];
}
export interface IStoreSchema extends CreateStoreSchema, Document {
  _id: ObjectId;
}
export interface MerchBodyParams {
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
