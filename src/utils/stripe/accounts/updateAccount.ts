import type { StripeAccountParams } from "types/stripe";
import stripe from "../connection";

export const updateAccount = async ({ id, updateAccount }: StripeAccountParams) => {
  if (!id) throw Error("id is required");
  return await stripe.accounts.update(id, updateAccount);
};
