import { StripeAccountParams } from "types/stripe";
import stripe from "../connection";

export const rejectAccount = async ({ id, rejectAccount }: StripeAccountParams) => {
  if (!id) throw Error("id is required");
  if (!rejectAccount) throw Error("rejectAccount is required");
  return await stripe.accounts.reject(id, rejectAccount);
};
