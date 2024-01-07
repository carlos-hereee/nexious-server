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
  uid?: string;
  merchId?: string;
  productId?: string;
  priceId?: string;
  hero?: string;
  name: string;
  description: string;
  inStock: number;
  cost: number;
}
export interface IMerchSchema extends Document {
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
  // inventory: IMerchSchema[];
  inventory: string[];
}

export interface GetStripeStoreProps {
  id?: string;
  limit?: number;
}
