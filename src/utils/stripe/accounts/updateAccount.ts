import type { StripeAccountRequest } from "@app/stripe";
import stripe from "../connection.js";

export const updateAccount = async ({ id, account }: StripeAccountRequest) => {
  return await stripe.accounts.update(id, account);
};
