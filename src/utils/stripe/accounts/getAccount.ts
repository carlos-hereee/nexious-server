import type { GetStripeStoreProps } from "@app/store";
import stripe from "../connection";

export const getAccount = async ({ id, limit }: GetStripeStoreProps) => {
  if (!id) return await stripe.accounts.list({ limit: limit || 30 });
  return await stripe.accounts.retrieve(id);
};
