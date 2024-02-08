import type { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";

export const getAccount = async ({ id, accountList }: StripeAccountParams) => {
  if (!id) return await stripe.accounts.list(accountList);
  return await stripe.accounts.retrieve(id);
};
