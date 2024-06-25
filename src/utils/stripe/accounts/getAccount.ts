import type { StripeAccountParams } from "types/stripe";
import stripe from "../connection";

export const getAccount = async ({ id }: StripeAccountParams) => {
  if (!id) throw Error("id is required");
  return await stripe.accounts.retrieve(id);
};
export const getAccountList = async ({ accountList }: StripeAccountParams) => {
  return await stripe.accounts.list(accountList);
};
