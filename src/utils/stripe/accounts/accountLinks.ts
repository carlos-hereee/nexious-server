import { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";

export const accountLinks = async ({ accountLink }: StripeAccountParams) => {
  if (!accountLink) throw Error("accountLink is required");
  return await stripe.accountLinks.create(accountLink);
};
