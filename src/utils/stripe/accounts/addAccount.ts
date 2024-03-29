import { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";

export const addAccount = async ({ addAccount, stripeAccount }: StripeAccountParams) => {
  return await stripe.accounts.create(addAccount, stripeAccount);
};
