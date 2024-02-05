import type { StripeRequestOptions } from "@app/stripe";
import stripe from "../connection";

export const getAccount = async ({ id, limit }: StripeRequestOptions) => {
  if (!id) return await stripe.accounts.list({ limit: limit || 30 });
  return await stripe.accounts.retrieve(id);
};
