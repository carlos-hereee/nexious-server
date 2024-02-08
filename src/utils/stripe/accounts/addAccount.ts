import { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";

export const addAccount = async ({ addAccount }: StripeAccountParams) => {
  return await stripe.accounts.create(addAccount);
};
