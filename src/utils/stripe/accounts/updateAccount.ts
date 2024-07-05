import type { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";

export const updateAccount = async ({ id, updateAccount }: StripeAccountParams) => {
  if (!id) throw Error("id is required");
  return await stripe.accounts.update(id, updateAccount);
};
export const updateCapabilities = async ({ id, accountId, updateAccountCapability }: StripeAccountParams) => {
  if (!id) throw Error("id is required");
  if (!accountId) throw Error("accountId is required");
  return await stripe.accounts.updateCapability(accountId, id, updateAccountCapability);
};

export const addAccount = async ({ addAccount, stripeAccount }: StripeAccountParams) => {
  return await stripe.accounts.create(addAccount, stripeAccount);
};
