import { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";

export const removeAccount = async ({ id }: StripeAccountParams) => {
  if (!id) throw Error("id is required");
  return await stripe.accounts.del(id);
};
