import { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";

export const rejectAccount = async ({ id, rejectAccount }: StripeAccountParams) => {
  if (!id) throw Error("id is required");
  if (!rejectAccount) throw Error("rejectAccount is required");
  return await stripe.accounts.reject(id, rejectAccount);
};
export const removeAccount = async ({ id }: StripeAccountParams) => {
  if (!id) throw Error("id is required");
  return await stripe.accounts.del(id);
};
